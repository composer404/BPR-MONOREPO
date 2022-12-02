import {BPRApiCreatedObject, Training} from "./interfaces";

export interface ITrainingService {
  createTraining(body: Partial<Training>): Promise<BPRApiCreatedObject | null>;
  getAdminTrainingForGym(): Promise<Training[] | null>;
  getTrainingById(trainingId: string): Promise<Training[]>;
}
