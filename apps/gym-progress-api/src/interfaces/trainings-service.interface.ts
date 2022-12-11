import { TrainingInput, TrainingWithExercisesInput } from 'src/models/training.model';

import { CreatedObjectResponse } from 'src/models';
import { Training } from '@prisma/client';

export abstract class ITrainingService {
    abstract getUserTrainingsForGym(userId: string, gymId: string): Promise<Training[] | null>;
    abstract getTrainingById(id: any): Promise<Training | null>;
    abstract getTrainingCreatedByAdmin(gymId: string): Promise<Training[] | null>;
    abstract createTrainingWithExercises(userId: string, body: TrainingWithExercisesInput);
    abstract createTraining(userId: string, body: TrainingInput): Promise<CreatedObjectResponse | null>;
    abstract updateTraining(id: any, body: TrainingInput): Promise<boolean>;
    abstract deleteTraining(id: string): Promise<boolean>;
}
