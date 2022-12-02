import {BPRApiCreatedObject, SessionExercise, TrainingSession} from './interfaces';

export interface ITrainingSessionService {
  createTrainingSession(trainingId: string): Promise<BPRApiCreatedObject | null>;
  getTrainingSessionById(id: string): Promise<TrainingSession | null>;
  updateTrainingSessionExercise(id: string, body: Partial<SessionExercise>);
  updateTrainingSession(id: string, body: Partial<TrainingSession>);
  getSessionsByIndex(index: number): Promise<TrainingSession[] | null>;
  getSessionsByTimePeriod(startDate: string, endDate: string): Promise<TrainingSession[] | null>;
}
