import { TrainingMachine, UsedTrainingMachine } from './interfaces';

import { Observable } from 'rxjs';

export abstract class ITrainingMachineService {
    abstract getTrainingMachinesForGym(gymId: string): Promise<TrainingMachine[] | null>;
    abstract getTrainingMachineById(trainingMachineId: string): Observable<TrainingMachine>;
    abstract getCurrentUsedTrainingMachinesIds(gymId: string): Promise<UsedTrainingMachine[] | null>;
    abstract changeTrainingMachineStatus(
        trainingMachineId: string,
        gymId: string,
        status: boolean,
        exerciseId: string,
    ): Promise<boolean | null>;
}
