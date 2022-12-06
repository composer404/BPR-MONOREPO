import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    ExerciseStatusChange,
    SessionExercise,
    Training,
    TrainingSession,
    TrainingSummary,
    UsedTrainingMachine,
    WEBSOCKET_REQUEST_EVENT,
    WEBSOCKET_RESPONSE_EVENT,
} from 'src/app/interfaces/interfaces';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ScannerService } from 'src/app/services/common/scanner.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';
import { TrainingService } from 'src/app/services/api/trainings.service';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'app-active-training',
    templateUrl: './active-training.page.html',
    styleUrls: ['./active-training.page.scss'],
})
export class ActiveTrainingPage implements OnInit {
    gymId: string;
    trainingSessionId: string;
    userId: string;

    trainigSession: TrainingSession;
    training: Training;
    trainingSummary: TrainingSummary;
    summary: boolean;

    trainingMachineChangeListener: any;
    trainingMachineIncommingValue: ExerciseStatusChange;
    occupiedMachinesIds: UsedTrainingMachine[];
    scannerActive: boolean;

    scanCorrect: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly websocketService: WebsocketService,
        private readonly trainingService: TrainingService,
        private readonly dialogService: DialogService,
        private readonly trainingSessionService: TrainingSessionService,
        private readonly toastService: ToastService,
        private readonly trainingMachineService: TrainingMachineService,
        private readonly router: Router,
        private readonly scannerService: ScannerService,
    ) {
        this.gymId = this.route.snapshot.params.gymId;
        this.userId = this.route.snapshot.params.id;
        this.trainingSessionId = this.route.snapshot.params.sessionId;
    }

    async ngOnInit(): Promise<void> {
        this.loadTrainingSession();
        this.listenForEvents();
        this.occupiedMachinesIds = await this.trainingMachineService.getCurrentUsedTrainingMachinesIds(this.gymId);

        // setTimeout(() => {
        //     this.occupiedMachinesIds = [];
        // }, 200);

        console.log(`occupuied from api`, this.occupiedMachinesIds);
        // .then((data) => {
        //     console.log(`data`, data);
        //     this.occupiedMachinesIds = data;
        // })
        // .catch((err) => {
        //     console.log(`here`, err);
        // });
    }

    stopScanner() {
        BarcodeScanner.stopScan();
        this.scannerActive = false;
    }

    async finishTrainig() {
        const copy = cloneDeep(this.trainigSession);
        this.occupiedMachinesIds = await this.trainingMachineService.getCurrentUsedTrainingMachinesIds(this.gymId);
        this.trainigSession = await this.trainingSessionService.getTrainingSessionById(this.trainingSessionId);
        const uncompleted = copy.sessionExercises.find((exercise) => exercise.completed === false);
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

    notifyAboutDisconnection(): void {
        const body = {
            gymId: this.gymId,
            userId: this.userId,
        };

        this.websocketService.sendMessage(WEBSOCKET_REQUEST_EVENT.disconnect_user_to_gym, JSON.stringify(body));
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
        this.notifyAboutDisconnection();
    }

    async loadTrainingSession() {
        this.trainigSession = await this.trainingSessionService.getTrainingSessionById(this.trainingSessionId);
        this.training = await this.trainingService.getTrainingById(this.trainigSession.trainingId);
    }

    goToMenu() {
        void this.router.navigate([`profile-tabs/profile/${this.userId}`]).then(() => {
            window.location.reload();
        });
    }

    async scanExercise(event: SessionExercise) {
        this.scannerActive = true;
        const scanResult = await this.scannerService.startScanner();
        this.scannerActive = false;

        if (scanResult !== event.trainingMachineId) {
            this.toastService.error(`Scanned QR code is invalid, make sure you scanned correct training machine`);
            return;
        }

        this.scanCorrect = event.id;
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
