import { CreatedObjectResponse } from 'src/models';
import { Exercise } from '@prisma/client';
import { ExerciseInput } from 'src/models/exercise.model';

export abstract class IExerciseService {
    abstract getExercisesForTraining(trainingId: string): Promise<Exercise[] | null>;
    abstract getExerciseById(id: any): Promise<Exercise | null>;
    abstract createExercise(trainingId: string, body: ExerciseInput): Promise<CreatedObjectResponse | null>;
    abstract deleteExercise(id: string): Promise<boolean>;
    abstract updateExercise(id: string, body: ExerciseInput): Promise<boolean>;
}
