import { BurnedCalories } from './interfaces';

export interface IFitnessService {
    getBurnedCalories(activityid:string, activitymin:number, weight:number): Promise<BurnedCalories>;
}