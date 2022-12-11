import { BPRApiCreatedObject, Exercise, ExerciseType } from './interfaces';

export abstract class IExerciseService {
    abstract createExercise(trainingId: string, body: Partial<Exercise>): Promise<BPRApiCreatedObject | null>;
    abstract getExercisesForTrainings(trainingId: string): Promise<Exercise[] | null>;
    abstract getExerciseById(id: string): Promise<Exercise | null>;
    abstract deleteExercise(id: string): Promise<boolean | null>;
    abstract editExercise(id: string, body: Partial<Exercise>): Promise<boolean | null>;
    abstract getActivityTypeId(activityid: string): Promise<Exercise | null>;
    abstract getAllExerciseTypes(): Promise<ExerciseType[] | null>;
    abstract calculateExerciseCalories(activityId: string, activityMin: number, weight: number): Promise<number>;
}
