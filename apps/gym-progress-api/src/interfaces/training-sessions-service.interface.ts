import { SessionExercise, TrainingSession } from '@prisma/client';
import { SessionExerciseInput, TrainingSessionInput } from 'src/models/training-session.model';

import { CreatedObjectResponse } from 'src/models';

export abstract class ITrainingSessionService {
    abstract createTrainingSession(userId: string, trainingId: string): Promise<CreatedObjectResponse | null>;
    abstract updateSessionExercise(id: string, input: Partial<SessionExerciseInput>): Promise<boolean>;
    abstract deleteTrainingSession(id: string): Promise<boolean>;
    abstract updateTrainingSession(id: string, input: Partial<TrainingSessionInput>): Promise<boolean>;
    abstract getSessionExerciseById(id: string): Promise<SessionExercise | null>;
    abstract getTrainingSessionById(id: string): Promise<TrainingSession | null>;
    abstract getTrainingSessionsForUser(userId: string): Promise<TrainingSession[] | null>;
    abstract getSessionsByIndex(startIndex: string, userId: string): Promise<TrainingSession[] | null>;
    abstract getSessionsByTimePeriod(
        startDate: string,
        endDate: string,
        userId: string,
    ): Promise<TrainingSession[] | null>;
}
