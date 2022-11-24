/* eslint-disable @typescript-eslint/no-unused-vars */
import { REQUEST_EVENT, RESPONSE_EVENT, SessionMessageInput, UsedTrainingMachine, UserSession } from './interfaces';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LoggerService } from '../logger/logger.service';

@WebSocketGateway({ cors: true })
export class SessionsGateway {
    @WebSocketServer()
    server: Server;

    private readonly gymWithUsers: Map<string, Map<string, UserSession>> = new Map<string, Map<string, UserSession>>();
    private readonly gymWithUsedTrainigMachines: Map<string, Map<string, UsedTrainingMachine>> = new Map<
        string,
        Map<string, UsedTrainingMachine>
    >();

    constructor(private readonly logger: LoggerService) {}

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

        this.emitForParticipantsCount(message.gymId);
    }

    @SubscribeMessage(REQUEST_EVENT.connect_kiosk_to_gym)
    listenForKioskConnection(@MessageBody() data: string) {
        const message = JSON.parse(data);
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
        return this.gymWithUsers.get(gymId).values.length;
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

    notifyAboutChangeOfTrainingMachine(gymId: string, userId: string, trainingMachine: UsedTrainingMachine) {
        this.logger.log(
            `Training machine ${trainingMachine.trainingMachineId} status changed for ${trainingMachine.status}`,
        );
        if (!trainingMachine.status) {
            this.addUsedTrainingMachine(gymId, trainingMachine);
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
