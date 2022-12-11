import { TrainingSession } from './interfaces';

export abstract class IStatService {
    abstract getCalories(chartDataSetMap: Map<string, TrainingSession[]>);
    abstract getTime(chartDataSetMap: Map<string, TrainingSession[]>);
    abstract calculateStatistics(trainingSessions: TrainingSession[]);
}
