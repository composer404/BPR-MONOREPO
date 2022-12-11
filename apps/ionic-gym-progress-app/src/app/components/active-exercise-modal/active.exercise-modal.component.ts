import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { IExerciseService } from 'src/app/interfaces/exercise-service.interface';
import { ITrainingSessionService } from 'src/app/interfaces/training-session-service.interface';
import { IUserService } from 'src/app/interfaces/user-service.interface';
import { ModalController } from '@ionic/angular';
import { SessionExercise } from 'src/app/interfaces/interfaces';
import { ToastService } from 'src/app/services/common/toast.service';

@Component({
    selector: 'app-active-exercise-modal',
    templateUrl: './active-exercise-modal.component.html',
})
export class ActiveExerciseModalComponent implements OnInit, OnDestroy {
    sessionExercise: SessionExercise;
    seconds = 0;

    timerInterval: any;
    timerString = `00:00`;

    constructor(
        private readonly authService: AuthService,
        private readonly userService: IUserService,
        private readonly modalController: ModalController,
        private readonly exerciseService: IExerciseService,
        private readonly trainingSessionService: ITrainingSessionService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit() {
        this.startTimer();
    }

    ngOnDestroy() {
        clearInterval(this.timerInterval);
    }

    async closeModal() {
        const profile = await this.authService.getProfile();
        this.userService.getUserById(profile.id).subscribe(async (data) => {
            const burnedCalories = await this.calculateCalories(data.weight);

            const updateResult = this.trainingSessionService.updateTrainingSessionExercise(this.sessionExercise.id, {
                completed: true,
                burnedCalories,
                timeInMinutes: Math.floor(this.seconds / 60),
            });

            if (!updateResult) {
                this.toastService.error(`Cannot complete the exercise. Try again`);
                return;
            }

            this.modalController.dismiss({
                burnedCalories,
                timeInMinutes: Math.floor(this.seconds / 60),
            });
        });
    }

    async calculateCalories(weight: number): Promise<number> {
        const burnedCalories = await this.exerciseService.calculateExerciseCalories(
            this.sessionExercise.exercise_type,
            Math.floor(this.seconds / 60),
            weight,
        );

        if (burnedCalories === null) {
            this.toastService.error(`Could not calculate calories`);
            return 0;
        }
        return burnedCalories;
    }

    startTimer() {
        this.buildTimerAsString();
        setInterval(() => {
            this.seconds += 1;
            this.buildTimerAsString();
        }, 1000);
    }

    buildTimerAsString() {
        const min = Math.floor(this.seconds / 60);
        const sec = this.seconds - min * 60;

        const minString = min <= 9 ? `0${min}` : min;
        const secString = sec <= 9 ? `0${sec}` : sec;

        this.timerString = `${minString}:${secString}`;
    }
}
