import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ExerciseStatusChange, SessionExercise, UsedTrainingMachine } from 'src/app/interfaces/interfaces';

import { ActiveExerciseModalComponent } from '../active-exercise-modal/active.exercise-modal.component';
import { DateTime } from 'luxon';
import { ITrainingMachineService } from 'src/app/interfaces/training-machine-service.interface';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/common/toast.service';

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
    canStartExercise: string;

    @Input()
    occupiedMachinesIds: UsedTrainingMachine[];

    @Output()
    scanTrainingMachine = new EventEmitter<SessionExercise>();

    exerciseCardStyle = `available`;

    timerInterval: any;
    showTimer: boolean;
    currentTime: string;
    exerciseStarted: boolean;
    unavaliable: boolean;
    overTimer: boolean;

    constructor(
        private readonly trainingMachineService: ITrainingMachineService,
        private readonly toastService: ToastService,
        private readonly modalController: ModalController,
    ) {}

    ngOnInit(): void {
        this.checkMachineOccupation();
    }

    ngOnChanges(changes) {
        const canStartChange = changes.canStartExercise;
        console.log(canStartChange);
        if (canStartChange?.currentValue && canStartChange?.previousValue !== canStartChange?.currentValue) {
            if (canStartChange.currentValue === this.exercise.id) {
                this.startAfterCorrectCheck();
            }
            return;
        }

        this.checkMachineOccupation();
        if (this.statusChange?.trainingMachine.trainingMachineId === this.exercise.trainingMachineId) {
            if (!this.statusChange.trainingMachine.status) {
                this.makeMachineUnavailable();
                return;
            }
            this.makeMachineAvailable();
        }
    }

    checkMachineOccupation() {
        if (this.occupiedMachinesIds && this.occupiedMachinesIds.length) {
            this.occupiedMachinesIds = this.occupiedMachinesIds.filter((machine) => machine.status === false);
            const machinesIds = this.occupiedMachinesIds.map((machine) => machine.trainingMachineId);
            if (machinesIds.includes(this.exercise.trainingMachineId)) {
                this.statusChange = {
                    trainingMachine: this.occupiedMachinesIds.find(
                        (element) => element.trainingMachineId === this.exercise.trainingMachineId,
                    ),
                };
                this.makeMachineUnavailable();
            }
            this.occupiedMachinesIds = [];
        }
    }

    async startAfterCorrectCheck() {
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
    }

    async startExercise() {
        this.scanTrainingMachine.emit(this.exercise);
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
        this.startTimer();
    }

    private makeMachineAvailable() {
        this.unavaliable = false;
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
