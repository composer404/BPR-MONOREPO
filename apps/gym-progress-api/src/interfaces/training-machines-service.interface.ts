import { CreatedObjectResponse } from 'src/models';
import { TraininMachineInput } from 'src/models/training-machines.model';
import { TrainingMachine } from '@prisma/client';

export abstract class ITrainingMachineService {
    abstract getTrainingMachinesByGymId(gymId: any): Promise<TrainingMachine[] | null>;
    abstract createTrainingMachine(gymId: string, body: TraininMachineInput): Promise<CreatedObjectResponse | null>;
    abstract toggleTrainingMachineState(
        id: string,
        exerciseId: string,
        status: boolean,
        gymId: string,
        userId: string,
    ): Promise<boolean>;
    abstract editTrainingMachine(id: any, body: TraininMachineInput): Promise<boolean>;
    abstract deleteTrainingMachine(id: any);
    abstract getTrainingMachineById(id: any): Promise<TrainingMachine | null>;
}
