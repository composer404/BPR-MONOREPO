import { SessionTotalStatistics, TrainingSession } from 'src/app/interfaces/interfaces';

import { IStatService } from 'src/app/interfaces/stat-service.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StatsService implements IStatService {
    getCalories(chartDataSetMap: Map<string, TrainingSession[]>) {
        const arrayToReturn = [];
        for (const [key, value] of chartDataSetMap) {
            let caloriesByDay = 0;
            value.forEach((session) => {
                session.sessionExercises.forEach((exercise) => {
                    caloriesByDay += exercise.burnedCalories;
                });
            });
            arrayToReturn.push(caloriesByDay);
        }
        return arrayToReturn;
    }

    getTime(chartDataSetMap: Map<string, TrainingSession[]>) {
        const arrayToReturn = [];
        for (const [key, value] of chartDataSetMap) {
            let timeByDay = 0;
            value.forEach((session) => {
                session.sessionExercises.forEach((exercise) => {
                    timeByDay += exercise.timeInMinutes;
                });
            });
            arrayToReturn.push(timeByDay);
        }
        return arrayToReturn;
    }

    calculateStatistics(trainingSessions: TrainingSession[]) {
        const total: SessionTotalStatistics = {
            totalBurnedCalories: 0,
            totalTimeInMinutes: 0,
            completedExercises: 0,
            completedTrainingSessions: 0,
        };

        trainingSessions.forEach((session) => {
            if (session.completed) {
                total.completedTrainingSessions += 1;
            }

            session.sessionExercises.forEach((exercise) => {
                if (exercise.completed) {
                    total.completedExercises += 1;
                    total.totalBurnedCalories += exercise.burnedCalories;
                    total.totalTimeInMinutes += exercise.timeInMinutes;
                }
            });
        });

        return total;
    }
}
