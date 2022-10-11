import { Training, WEBSOCKET_EVENTS } from 'src/app/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingService } from 'src/app/services/api/trainings.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    scannedValue;
    scanActive = false;
    userId: string;
    currentGymId: string;
    trainings: Training[];

    constructor(
        private readonly trainingService: TrainingService,
        private readonly toastService: ToastService,
        private readonly websocketService: WebsocketService,
        private readonly route: ActivatedRoute,
    ) {
        this.userId = this.route.snapshot.params.id;
    }

    // ! REPLACE WITH SCANNER SERVICE
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

    async loadTrainings() {
        this.trainings = await this.trainingService.getUserTrainingForGym(this.currentGymId);
    }

    notifyAboutConnection(): void {
        const body = {
            gymId: this.currentGymId,
            userId: this.userId,
        };

        this.websocketService.sendMessage(WEBSOCKET_EVENTS.connect_to_gym, JSON.stringify(body));
    }

    // ! REPLACE WITH SCANNER SERVICE
    async startScanner() {
        if (!environment.production) {
            this.currentGymId = `dd186798-23bb-4834-a989-9b81b4ff1304`;
            void this.loadTrainings();
            this.notifyAboutConnection();
            return;
        }
        const allowed = await this.checkPermission();

        if (allowed) {
            this.scanActive = true;
            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan();

            if (result.hasContent) {
                this.scanActive = false;
                this.currentGymId = result.content;
                await this.loadTrainings();
            } else {
                this.toastService.error(`Scanned object is invalid`);
            }
        } else {
            this.toastService.error(`No camera permissions!`);
        }
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
