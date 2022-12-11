import { BPRApiCreatedObject, Training } from './interfaces';

export abstract class ITrainingsService {
    abstract createTraining(body: Partial<Training>): Promise<BPRApiCreatedObject | null>;
    abstract createTrainingWithExercises(body: Partial<Training>): Promise<BPRApiCreatedObject | null>;
    abstract getUserTrainingForGym(gymId: string): Promise<Training[] | null>;
    abstract getTrainingById(trainingId: string): Promise<Training> | null;
    abstract getTrainingsCreatedByAdmin(gymId: string): Promise<Training[] | null>;
    abstract editTraining(trainingId: string, body: Partial<Training>);
    abstract deleteTraining(trainingId: string);
}
