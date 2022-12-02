import {BPRApiCreatedObject, Exercise, ExerciseType} from './interfaces';


export interface IExerciseService {
  createExercise(trainingId: string, body: Partial<Exercise>): Promise<BPRApiCreatedObject | null>;
  getExercisesForTrainings(trainingId: string): Promise<Exercise[] | null>;
  getExerciseById(id: string): Promise<Exercise | null>;
  deleteExercise(id: string): Promise<boolean | null>;
  editExercise(id: string, body: Partial<Exercise>): Promise<boolean | null>;
  getActivityTypeId(activityid: string): Promise<Exercise | null>;
  getAllExerciseTypes(): Promise<ExerciseType[] | null>;
  calculateExerciseCalories(activityId: string, activityMin: number, weight: number): Promise<number>;
}
