import {BPRApiCreatedObject, Training} from './interfaces';

export interface ITrainingsService {
  createTraining(body: Partial<Training>): Promise<BPRApiCreatedObject | null>;
  createTrainingWithExercises(body: Partial<Training>): Promise<BPRApiCreatedObject | null>;
  getUserTrainingForGym(gymId: string): Promise<Training[] | null>;
  getTrainingById(trainingId: string): Promise<Training> | null;
  getTrainingsCreatedByAdmin(gymId: string): Promise<Training[] | null>;
  editTraining(trainingId: string, body: Partial<Training>);
}
