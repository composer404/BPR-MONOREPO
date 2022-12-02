import {TrainingMachine, UsedTrainingMachine} from './interfaces';
import {Observable} from 'rxjs';

export interface ITrainingMachineService {

  getTrainingMachinesForGym(gymId: string): Promise<TrainingMachine[] | null>;
  getTrainingMachineById(trainingMachineId: string): Observable<TrainingMachine>;
  getCurrentUsedTrainingMachinesIds(gymId: string): Promise<UsedTrainingMachine[] | null>;
  changeTrainingMachineStatus(
    trainingMachineId: string,
    gymId: string,
    status: boolean,
    exerciseId: string,
  ): Promise<boolean | null>;
}
