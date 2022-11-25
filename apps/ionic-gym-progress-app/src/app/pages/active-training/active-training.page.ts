import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    ExerciseStatusChange,
    Training,
    TrainingSession,
    TrainingSummary,
    UsedTrainingMachine,
    WEBSOCKET_RESPONSE_EVENT,
} from 'src/app/interfaces/interfaces';

import { DialogService } from 'src/app/services/common/dialog.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';
import { TrainingService } from 'src/app/services/api/trainings.service';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';

@Component({
    selector: 'app-active-training',
    templateUrl: './active-training.page.html',
    styleUrls: ['./active-training.page.scss'],
})
export class ActiveTrainingPage implements OnInit {
    gymId: string;
    trainingSessionId: string;
    userId: string;

    // exercises: SessionExercise[] = [];

    trainigSession: TrainingSession;
    training: Training;
    trainingSummary: TrainingSummary;
    summary: boolean;

    trainingMachineChangeListener: any;
    trainingMachineIncommingValue: ExerciseStatusChange;
    occupiedMachinesIds: UsedTrainingMachine[];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly websocketService: WebsocketService,
        private readonly trainingService: TrainingService,
        private readonly dialogService: DialogService,
        private readonly trainingSessionService: TrainingSessionService,
        private readonly toastService: ToastService,
        private readonly trainingMachineService: TrainingMachineService,
        private readonly router: Router,
    ) {
        this.gymId = this.route.snapshot.params.gymId;
        this.userId = this.route.snapshot.params.id;
        this.trainingSessionId = this.route.snapshot.params.sessionId;
    }

    ngOnInit(): void {
        // this.trainingMachineService.getCurrentUsedTrainingMachinesIds(this.gymId).then((data) => {
        //     if (!data) {
        //         this.toastService.error(`Cannot load information about gym equipment. Try again later.`);
        //         return;
        //     }

        // this.occupiedMachinesIds = data;
        this.loadTrainingSession();
        this.listenForEvents();
        this.trainingMachineService.getCurrentUsedTrainingMachinesIds(this.gymId).then((data) => {
            this.occupiedMachinesIds = data;
        });
        // });

        //! DELETE
        // this.loadTrainingSummary();
        // this.summary = true;
    }

    async finishTrainig() {
        this.trainigSession = await this.trainingSessionService.getTrainingSessionById(this.trainingSessionId);
        const uncompleted = this.trainigSession.sessionExercises.find((exercise) => exercise.completed === false);
        if (uncompleted) {
            this.dialogService.openConfirmationDialog({
                header: `You have uncompleted exercise. Are you sure to finish?`,
                confirmFn: () => {
                    this.saveTrainingSessionAndShowSummary();
                },
            });
            return;
        }

        this.saveTrainingSessionAndShowSummary();
    }

    saveTrainingSessionAndShowSummary() {
        const result = this.trainingSessionService.updateTrainingSession(this.trainigSession.id, {
            completed: true,
        });

        if (!result) {
            this.toastService.error(`Cannot finish training. Try again later.`);
            return;
        }
        this.loadTrainingSummary();
        this.summary = true;
    }

    async loadTrainingSession() {
        this.trainigSession = await this.trainingSessionService.getTrainingSessionById(this.trainingSessionId);
        this.training = await this.trainingService.getTrainingById(this.trainigSession.trainingId);
    }

    goToMenu() {
        void this.router.navigate([`profile-tabs/profile/${this.userId}`]);
    }

    loadTrainingSummary() {
        let totalCalories = 0;
        let totalMinutes = 0;
        let totalCompletedExercises = 0;

        this.trainigSession.sessionExercises.forEach((exercise) => {
            if (exercise.completed) {
                totalCompletedExercises++;
                totalCalories += exercise.burnedCalories;
                totalMinutes += exercise.timeInMinutes;
            }
        });

        this.trainingSummary = {
            sessionDate: this.trainigSession.createdAt,
            totalCalories,
            totalMinutes,
            totalCompletedExercises,
        };
    }

    private listenForEvents() {
        this.trainingMachineChangeListener = (data) => {
            this.trainingMachineIncommingValue = data;
        };
        this.websocketService.listenForEvent(
            WEBSOCKET_RESPONSE_EVENT.trainign_machine_status_changed,
            this.trainingMachineChangeListener,
        );
    }
}
