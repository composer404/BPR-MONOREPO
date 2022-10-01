import { TrainingMachines } from 'src/app/interfaces/interfaces';

export interface TrainingMachinesService {
    getTrainingMachines: Promise<TrainingMachines[]>;
}