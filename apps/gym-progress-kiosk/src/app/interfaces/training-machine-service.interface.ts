import { BPRApiCreatedObject, TrainingMachines } from './interfaces';

export abstract class ITrainingMachinesService {
    abstract getTrainingMachinesForGym(): Promise<TrainingMachines[]>;
    abstract createTrainingMachine(body: Partial<TrainingMachines>): Promise<BPRApiCreatedObject | null>;
    abstract editTrainingMachine(
        trainingMachineId: string,
        trainingMachineBody: Partial<TrainingMachines>,
    ): Promise<boolean>;
    abstract removeTrainingMachinesById(trainingMachineId: string): Promise<boolean>;
    abstract getTrainingMachineById(id: string): Promise<TrainingMachines[]>;
}
