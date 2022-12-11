/* eslint-disable @typescript-eslint/no-unused-vars */
import { REQUEST_EVENT, RESPONSE_EVENT, SessionMessageInput, UsedTrainingMachine, UserSession } from './interfaces';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ILoggerService } from 'src/interfaces/logger-service.interface';
@WebSocketGateway({ cors: true })
export class SessionsGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly gymWithUsers: Map<string, Map<string, UserSession>> = new Map<string, Map<string, UserSession>>();
    private readonly gymWithUsedTrainigMachines: Map<string, Map<string, UsedTrainingMachine>> = new Map<
        string,
        Map<string, UsedTrainingMachine>
    >();

    constructor(private readonly logger: ILoggerService) {}

    handleDisconnect(socket: Socket) {
        for (const [key, value] of this.gymWithUsers) {
            for (const [sessionKey, sessionValue] of value) {
                if (socket.id === sessionValue.socket.id) {
                    const gym = this.gymWithUsers.get(key);
                    gym.delete(sessionKey);
                    socket.disconnect();
                }
            }
        }
    }

    @SubscribeMessage(REQUEST_EVENT.connect_user_to_gym)
    listenForUserConnection(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
        const message = JSON.parse(data);
        this.logger.log(`USER CONNECTED TO GYM: gymId: ${message.gymId}, userId: ${message.userId}`);
        if (!this.gymWithUsers.get(message.gymId)) {
            return;
        }

        const gym = this.gymWithUsers.get(message.gymId);
        gym.set(message.userId, {
            socket,
        });

        this.logger.log(`current users: ${[...this.gymWithUsers.get(message.gymId).keys()]}`);
    }

    @SubscribeMessage(REQUEST_EVENT.disconnect_user_to_gym)
    listenForUserDisconnection(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
        const message = JSON.parse(data);

        const gym = this.gymWithUsers.get(message.gymId);
        gym.delete(message.userId);

        this.logger.log(`USER DISCONNECTED FROM GYM: gymId: gymId: ${message.gymId}, user: ${message.userId}`);
    }

    @SubscribeMessage(REQUEST_EVENT.connect_kiosk_to_gym)
    listenForKioskConnection(@MessageBody() data: string) {
        const message = JSON.parse(data);

        const exists = this.gymWithUsedTrainigMachines.get(message.id);

        if (exists) {
            return;
        }

        this.logger.log(`KIOSK CONNECTED TO GYM: gymId: ${message.id}`);

        this.gymWithUsers.set(message.id, new Map<string, UserSession>());
        this.gymWithUsedTrainigMachines.set(message.id, new Map<string, UsedTrainingMachine>());
        this.logger.log(`A workspace for machines and users is open`);
    }

    @SubscribeMessage(REQUEST_EVENT.count_participants)
    emitForParticipantsCount(@MessageBody() gymId: string) {
        this.logger.log(`Received count participants event for gym: ${gymId}`);

        const gym = this.gymWithUsers.get(gymId);
        const count = this.gymWithUsers.get(gymId).values.length;
        for (const [key, value] of gym) {
            value.socket.emit(RESPONSE_EVENT.count_participants_reply, {
                count,
            });
        }
    }

    @SubscribeMessage(REQUEST_EVENT.count_used_training_machines)
    emitUsedTrainingMachinesCount(@MessageBody() gymId: string) {
        this.logger.log(`Received count used training machines event for gym: ${gymId}`);

        const count = this.gymWithUsedTrainigMachines.get(gymId).values.length;
        const gym = this.gymWithUsers.get(gymId);
        for (const [key, value] of gym) {
            value.socket.emit(RESPONSE_EVENT.count_used_training_machines_reply, {
                count,
            });
        }
    }

    @SubscribeMessage(REQUEST_EVENT.used_training_machines)
    listenAllUsedTrainingMachines(@MessageBody() message: string) {
        const messageBody: SessionMessageInput = JSON.parse(message);
        const userSocket = this.findUserSocketById(messageBody.gymId, messageBody.userId);
        const gymWithUsedTrainingMachinesMap = this.gymWithUsedTrainigMachines.get(messageBody.gymId);

        userSocket.emit(RESPONSE_EVENT.used_training_machines_reply, {
            gymWithUsedTrainingMachinesMap,
        });
    }

    getNumberOfParticipants(gymId: string) {
        if (!this.gymWithUsers.get(gymId)) {
            return 0;
        }
        return Array.from(this.gymWithUsers.get(gymId).values()).length;
    }

    getGymUsedTrainingMachinesIds(gymId: string): UsedTrainingMachine[] {
        const array = Array.from(this.gymWithUsedTrainigMachines.get(gymId).values()).filter(
            (machine) => machine.status === false,
        );
        return array;
    }

    getNumberOfUsedTrainingMachines(gymId: string) {
        return this.gymWithUsedTrainigMachines.get(gymId).values.length;
    }

    makeMachineAvaliableAgainTimeout(trainingMachine: UsedTrainingMachine, gymId: string, uniqeIdentifier: number) {
        const gymWithMachines = this.gymWithUsedTrainigMachines.get(gymId);
        const gym = this.gymWithUsers.get(gymId);
        const machine = gymWithMachines.get(trainingMachine.trainingMachineId);

        if (!machine?.status && uniqeIdentifier === trainingMachine.uniqeIdentifier) {
            this.logger.log(`Automatically make machine ${trainingMachine.trainingMachineId} free`);
            this.removeUsedTrainingMachine(gymId, trainingMachine.trainingMachineId);
            trainingMachine.status = true;

            for (const [key, value] of gym) {
                this.logger.log(`EMIT TRAINING MACHINE CHANGE FOR USER: ${key}`);
                value.socket.emit(RESPONSE_EVENT.trainign_machine_status_changed, {
                    trainingMachine,
                });
            }
        }
    }

    notifyAboutChangeOfTrainingMachine(gymId: string, userId: string, trainingMachine: UsedTrainingMachine) {
        this.logger.log(
            `Training machine ${trainingMachine.trainingMachineId} status changed for ${trainingMachine.status}`,
        );
        if (!trainingMachine.status) {
            this.addUsedTrainingMachine(gymId, trainingMachine);

            const uniqeIdentifier = Date.now();
            const timeToFreeAgain = trainingMachine.timeframeInMinutes * 1.5 * 60000;
            trainingMachine.uniqeIdentifier = uniqeIdentifier;
            this.logger.log(`Training machine will be free again after ${timeToFreeAgain}miliseconds`);
            setTimeout(() => {
                this.makeMachineAvaliableAgainTimeout(trainingMachine, gymId, uniqeIdentifier);
            }, timeToFreeAgain);
        }

        if (trainingMachine.status) {
            this.removeUsedTrainingMachine(gymId, trainingMachine.trainingMachineId);
        }

        const gym = this.gymWithUsers.get(gymId);
        for (const [key, value] of gym) {
            if (key !== userId) {
                this.logger.log(`EMIT TRAINING MACHINE CHANGE FOR USER: ${key}`);
                value.socket.emit(RESPONSE_EVENT.trainign_machine_status_changed, {
                    trainingMachine,
                });
            }
        }

        this.emitUsedTrainingMachinesCount(gymId);
    }

    private addUsedTrainingMachine(gymId: string, usedTrainingMachine: UsedTrainingMachine): void {
        const gymWithUsedTrainigMachines = this.gymWithUsedTrainigMachines.get(gymId);
        gymWithUsedTrainigMachines.set(usedTrainingMachine.trainingMachineId, usedTrainingMachine);
    }

    private removeUsedTrainingMachine(gymId: string, trainingMachineId: string): void {
        const gymWithUsedTrainigMachines = this.gymWithUsedTrainigMachines.get(gymId);
        gymWithUsedTrainigMachines.delete(trainingMachineId);
    }

    private findUserSocketById(gymId: string, userId: string): Socket {
        const usersMap = this.gymWithUsers.get(gymId);
        return usersMap.get(userId).socket;
    }
}
