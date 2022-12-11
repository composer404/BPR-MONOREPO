import { ActivatedRoute, Router } from '@angular/router';
import { Training, WEBSOCKET_REQUEST_EVENT } from 'src/app/interfaces/interfaces';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Component } from '@angular/core';
import { IScannerService } from 'src/app/interfaces/scanner.interface';
import { ITrainingSessionService } from 'src/app/interfaces/training-session-service.interface';
import { ITrainingsService } from 'src/app/interfaces/trainings-service.interface';
import { IWebsocketService } from 'src/app/interfaces/websocket-service.interface';
import { ToastService } from 'src/app/services/common/toast.service';

@Component({
    selector: 'app-start-training',
    templateUrl: './start-training.page.html',
    styleUrls: ['./start-training.page.scss'],
})
export class StartTrainingPage {
    scannedValue;
    scanActive = false;
    userId: string;
    currentGymId: string;
    trainings: Training[] = [];

    constructor(
        private readonly trainingService: ITrainingsService,
        private readonly websocketService: IWebsocketService,
        private readonly trainingSessionService: ITrainingSessionService,
        private readonly scannerService: IScannerService,
        private readonly route: ActivatedRoute,
        private readonly toastService: ToastService,
        private readonly router: Router,
    ) {
        this.userId = this.route.snapshot.params.id;
    }

    async loadTrainings() {
        this.trainings = await this.trainingService.getUserTrainingForGym(this.currentGymId);
    }

    goToTheActiveSession(sessionId: string) {
        void this.router.navigate([
            `profile/${this.userId}/active-training/gym/${this.currentGymId}/session/${sessionId}`,
        ]);
    }

    notifyAboutConnection(): void {
        const body = {
            gymId: this.currentGymId,
            userId: this.userId,
        };

        this.websocketService.sendMessage(WEBSOCKET_REQUEST_EVENT.connect_user_to_gym, JSON.stringify(body));
    }

    async createTrainingSession(trainingId: string) {
        const result = await this.trainingSessionService.createTrainingSession(trainingId);

        if (!result) {
            this.toastService.error(`Cannot create a training session. Try again later.`);
            return;
        }

        this.goToTheActiveSession(result.id);
    }

    async checkPermission() {
        return new Promise(async (resolve, reject) => {
            const status = await BarcodeScanner.checkPermission({ force: true });
            if (status.granted) {
                resolve(true);
            } else if (status.denied) {
                BarcodeScanner.openAppSettings();
                resolve(false);
            }
        });
    }

    async startScanner() {
        this.scanActive = true;
        this.currentGymId = await this.scannerService.startScanner();
        this.scanActive = false;
        void this.loadTrainings();
        this.notifyAboutConnection();
    }

    stopScanner() {
        BarcodeScanner.stopScan();
        this.scanActive = false;
    }

    ionViewWillLeave() {
        BarcodeScanner.stopScan();
        this.scanActive = false;
    }
}
