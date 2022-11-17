import { Component, Input, OnChanges } from '@angular/core';
import { Exercise, ExerciseStatusChange } from 'src/app/interfaces/interfaces';

import { DateTime } from 'luxon';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';

@Component({
    selector: 'app-active-training-exercise',
    templateUrl: './active-training-exercise.component.html',
    styleUrls: ['./active-training-exercise.component.scss'],
})
export class ActiveTrainingExerciseComponent implements OnChanges {
    @Input()
    exercise: Exercise;

    @Input()
    statusChange: ExerciseStatusChange;

    @Input()
    gymId: string;

    exerciseCardStyle = `available`;

    timerInterval: any;
    showTimer: boolean;
    currentTime: string;
    exerciseStarted: boolean;

    constructor(
        private readonly trainingMachineService: TrainingMachineService,
        private readonly toastService: ToastService,
    ) {}

    ngOnChanges() {
        if (this.statusChange?.trainingMachine.trainingMachineId === this.exercise.trainingMachineId) {
            if (!this.statusChange.trainingMachine.status) {
                this.makeMachineUnavailable();
                return;
            }
            this.makeMachineAvailable();
        }
    }

    async startExercise() {
        const response = await this.trainingMachineService.changeTrainingMachineStatus(
            this.exercise.trainingMachineId,
            this.gymId,
            false,
            this.exercise.id,
        );
        if (!response) {
            this.toastService.error(`Cannot start exercise. Try again in a few seconds`);
            return;
        }
        this.exerciseStarted = true;
    }

    async finishExercise() {
        const response = await this.trainingMachineService.changeTrainingMachineStatus(
            this.exercise.trainingMachineId,
            this.gymId,
            true,
            this.exercise.id,
        );
        if (!response) {
            this.toastService.error(`Cannot finish exercise. Try again in a few seconds`);
            return;
        }
        this.exerciseStarted = false;
    }

    private makeMachineUnavailable() {
        this.exerciseCardStyle = `unavailable`;
        this.startTimer();
    }

    private makeMachineAvailable() {
        this.exerciseCardStyle = `available`;
        this.stopTimer();
    }

    private startTimer() {
        const endTime = DateTime.fromISO(this.statusChange.trainingMachine.stringStartedTimestamp).plus({
            minutes: this.statusChange.trainingMachine.timeframeInMinutes,
        });
        const endTimeTimestamp = endTime.toMillis();
        const currentTimestamp = DateTime.now().toMillis();

        let timeLeft = endTimeTimestamp - currentTimestamp;

        this.timerInterval = setInterval(() => {
            timeLeft -= 1000;
            this.currentTime = timeLeft.toString();
        }, 1000);
        this.showTimer = true;
    }

    private stopTimer() {
        this.showTimer = false;
        clearInterval(this.timerInterval);
    }
}
