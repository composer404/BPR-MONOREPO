import { BPRApiCreatedObject, Training } from './interfaces';

export abstract class ITrainingService {
    abstract createTraining(body: Partial<Training>): Promise<BPRApiCreatedObject | null>;
    abstract getAdminTrainingForGym(): Promise<Training[] | null>;
    abstract getTrainingById(trainingId: string): Promise<Training[]>;
    abstract deleteTraining(trainingId: string): Promise<boolean>;
    abstract editTraining(trainingId: string, body: Partial<Training>): Promise<boolean>;
}
