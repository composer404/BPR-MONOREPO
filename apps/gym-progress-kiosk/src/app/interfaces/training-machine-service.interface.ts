import {BPRApiCreatedObject, TrainingMachines} from './interfaces';

export interface ITrainingMachinesService {
    getTrainingMachinesForGym(gymId: string): Promise<TrainingMachines[]>;
    createTrainingMachine(body: Partial<TrainingMachines>): Promise<BPRApiCreatedObject | null>;
    editTrainingMachine(
      trainingMachineId: string,
      trainingMachineBody: Partial<TrainingMachines>,
    ): Promise<boolean>;
    removeTrainingMachinesById(trainingMachineId: string): Promise<boolean>;
    getTrainingMachineById(id:string): Promise<TrainingMachines[]>;
}
