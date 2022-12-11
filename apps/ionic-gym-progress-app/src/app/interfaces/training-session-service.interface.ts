import { BPRApiCreatedObject, SessionExercise, TrainingSession } from './interfaces';

export abstract class ITrainingSessionService {
    abstract createTrainingSession(trainingId: string): Promise<BPRApiCreatedObject | null>;
    abstract getTrainingSessionById(id: string): Promise<TrainingSession | null>;
    abstract updateTrainingSessionExercise(id: string, body: Partial<SessionExercise>);
    abstract updateTrainingSession(id: string, body: Partial<TrainingSession>);
    abstract getSessionsByIndex(index: number): Promise<TrainingSession[] | null>;
    abstract getSessionsByTimePeriod(startDate: string, endDate: string): Promise<TrainingSession[] | null>;
}
