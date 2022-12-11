import { Socket } from 'socket.io';
import { UsedTrainingMachine } from 'src/modules/socket/interfaces';

export abstract class ISocketService {
    abstract handleDisconnect(socket: Socket);
    abstract listenForUserConnection(data: string, socket: Socket);
    abstract listenForUserDisconnection(data: string, socket: Socket);
    abstract listenForKioskConnection(data: string);
    abstract emitForParticipantsCount(gymId: string);
    abstract emitUsedTrainingMachinesCount(gymId: string);
    abstract listenAllUsedTrainingMachines(message: string);
    abstract getNumberOfParticipants(gymId: string);
    abstract getGymUsedTrainingMachinesIds(gymId: string): UsedTrainingMachine[];
    abstract getNumberOfUsedTrainingMachines(gymId: string);
    abstract makeMachineAvaliableAgainTimeout(
        trainingMachine: UsedTrainingMachine,
        gymId: string,
        uniqeIdentifier: number,
    );
    abstract notifyAboutChangeOfTrainingMachine(gymId: string, userId: string, trainingMachine: UsedTrainingMachine);
}
