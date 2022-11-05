/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise, Training, TrainingMachine, WEBSOCKET_EVENTS } from '../../interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../services/api/exercise.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';
import { TrainingService } from '../../services/api/trainings.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.page.html',
    styleUrls: ['./training-details.page.scss'],
})
export class TrainingDetailsPage implements OnInit, OnDestroy {
    exercises: Exercise[] = [];
    trainingMachines: TrainingMachine[] = [];

    selectedTraining: Training;
    trainingId: string;
    gymId: string;

    trainingMachineChangeListener: any;
    trainingMachineIncommingValue: any;

    constructor(
        private route: ActivatedRoute,
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingMachinesService: TrainingMachineService,
        private readonly toastService: ToastService,
        private readonly websocektService: WebsocketService,
    ) {
        this.trainingId = this.route.snapshot.params.trainingId;
        this.gymId = this.route.snapshot.params.gymId;
    }

    ngOnInit(): void {
        this.loadTrainingData();
        this.loadExercises();
        this.loadTrainingMachines();
        this.listenForTrainingMachineChangeState();
    }

    ngOnDestroy(): void {
        this.websocektService.removeListener(this.trainingMachineChangeListener);
    }

    async loadTrainingData(): Promise<void> {
        const result = await this.trainingService.getTrainingById(this.trainingId);
        if (!result) {
            this.toastService.error(`Cannot load selected training. Try again later.`);
            return;
        }

        this.selectedTraining = result;
    }

    loadExercises(): void {
        this.exerciseService.getExercisesForTrainings(this.trainingId).then((result) => {
            if (!result) {
                this.toastService.error(`Cannot load exercises. Try again later.`);
                return;
            }
            if (result) {
                this.exercises = result;
            }
        });
    }

    loadTrainingMachines(): void {
        this.trainingMachinesService.getTrainingMachinesForGym(this.gymId).then((result) => {
            if (!result) {
                this.toastService.error(`Cannot load training machines. Try again later.`);
                return;
            }
            if (result) {
                console.log(`training machines`, result);
                this.trainingMachines = result;
            }
        });
    }

    listenForTrainingMachineChangeState() {
        this.trainingMachineChangeListener = (data) => {
            console.log(`Training machine state changes`, data);
            this.trainingMachineIncommingValue = data;
        };
        this.websocektService.listenForEvent(
            WEBSOCKET_EVENTS.training_machine_change,
            this.trainingMachineChangeListener,
        );
    }
}
