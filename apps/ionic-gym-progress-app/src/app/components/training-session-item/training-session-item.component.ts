import { Component, Input, OnInit } from '@angular/core';
import { SingleSessionStats, Training, TrainingSession } from 'src/app/interfaces/interfaces';

import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-training-session-item',
    templateUrl: './training-session-item.component.html',
    styleUrls: ['./training-session-item.component.scss'],
})
export class TrainingSessionItemComponent implements OnInit {
    @Input()
    trainingSession: TrainingSession;

    training: Training;
    sessionStats: SingleSessionStats;

    constructor(private readonly traingService: TrainingService) {}

    ngOnInit() {
        void this.loadTrainingDetails();
        this.calculateStats();
    }

    async loadTrainingDetails(): Promise<void> {
        const response = await this.traingService.getTrainingById(this.trainingSession.trainingId);
        if (response) {
            this.training = response;
        }
    }

    calculateStats(): void {
        const stats = {
            completedExercises: 0,
            totalBurnedCalories: 0,
            totalTimeInMinutes: 0,
        };

        this.trainingSession.sessionExercises.forEach((exercise) => {
            if (exercise.completed) {
                stats.completedExercises += 1;
                stats.totalBurnedCalories += exercise.burnedCalories;
                stats.totalTimeInMinutes += exercise.timeInMinutes;
            }
        });

        this.sessionStats = stats;
    }
}
