import { TrainingMachines } from './interfaces';

export abstract class IElectronService {
    abstract print(trainingMachine: TrainingMachines): Promise<boolean> | undefined;
}
