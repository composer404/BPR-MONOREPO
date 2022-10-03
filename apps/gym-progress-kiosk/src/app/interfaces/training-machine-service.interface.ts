import { TrainingMachines } from './interfaces';

export interface ITrainingMachinesService {
    getTrainingMachinesForGym(gymId: string): Promise<TrainingMachines[]>;
}