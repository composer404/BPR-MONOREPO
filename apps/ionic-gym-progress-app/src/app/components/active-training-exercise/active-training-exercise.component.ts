import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Exercise, ExerciseStatusChange, SessionExercise, UsedTrainingMachine } from 'src/app/interfaces/interfaces';

import { ActiveExerciseModalComponent } from '../active-exercise-modal/active.exercise-modal.component';
import { DateTime } from 'luxon';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';

@Component({
    selector: 'app-active-training-exercise',
    templateUrl: './active-training-exercise.component.html',
    styleUrls: ['./active-training-exercise.component.scss'],
})
export class ActiveTrainingExerciseComponent implements OnChanges, OnInit {
    @Input()
    exercise: SessionExercise;

    @Input()
    statusChange: ExerciseStatusChange;

    @Input()
    gymId: string;

    @Input()
    occupiedMachinesIds: UsedTrainingMachine[];

    exerciseCardStyle = `available`;

    timerInterval: any;
    showTimer: boolean;
    currentTime: string;
    exerciseStarted: boolean;
    unavaliable: boolean;
    overTimer: boolean;

    constructor(
        private readonly trainingMachineService: TrainingMachineService,
        private readonly toastService: ToastService,
        private readonly modalController: ModalController,
    ) {}

    ngOnInit(): void {
        const machinesIds = this.occupiedMachinesIds.map((machine) => machine.trainingMachineId);
        if (machinesIds.includes(this.exercise.trainingMachineId)) {
            this.statusChange = {
                trainingMachine: this.occupiedMachinesIds.find(
                    (element) => element.trainingMachineId === this.exercise.trainingMachineId,
                ),
            };
            this.makeMachineUnavailable();
        }
    }

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
        this.openExerciseModal();
        // this.exerciseStarted = true;
    }

    async openExerciseModal() {
        const modal = await this.modalController.create({
            component: ActiveExerciseModalComponent,
            componentProps: {
                sessionExercise: this.exercise,
            },
            cssClass: 'my-modal-class',
            backdropDismiss: false,
        });

        modal.onDidDismiss().then((result) => {
            this.exercise.completed = true;
            this.exercise.burnedCalories = result.data.burnedCalories;
            this.exercise.timeInMinutes = result.data.timeInMinutes;
            this.finishExercise();
        });

        modal.present();
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
        this.unavaliable = true;
        // this.exerciseCardStyle = `unavailable`;
        this.startTimer();
    }

    private makeMachineAvailable() {
        this.unavaliable = false;
        // this.exerciseCardStyle = `available`;
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
            if (timeLeft <= 0) {
                this.overTimer = true;
                clearInterval(this.timerInterval);
            }
            this.currentTime = timeLeft.toString();
        }, 1000);
        this.showTimer = true;
    }

    private stopTimer() {
        this.showTimer = false;
        clearInterval(this.timerInterval);
    }
}
