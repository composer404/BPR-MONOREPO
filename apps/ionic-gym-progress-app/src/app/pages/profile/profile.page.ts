import { ActivatedRoute, Router } from '@angular/router';
import { Training, WEBSOCKET_REQUEST_EVENT } from 'src/app/interfaces/interfaces';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Component } from '@angular/core';
import { ScannerService } from 'src/app/services/common/scanner.service';
import { TrainingService } from 'src/app/services/api/trainings.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';

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
    trainings: Training[] = [];

    constructor(
        private readonly trainingService: TrainingService,
        private readonly websocketService: WebsocketService,
        private readonly scannerService: ScannerService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
    ) {
        this.userId = this.route.snapshot.params.id;
    }

    async loadTrainings() {
        this.trainings = await this.trainingService.getUserTrainingForGym(this.currentGymId);
    }

    goToTrainingDetails(trainingId: string) {
        void this.router.navigate([`/active-training/gym/${this.currentGymId}/training/${trainingId}`]);
    }

    notifyAboutConnection(): void {
        const body = {
            gymId: this.currentGymId,
            userId: this.userId,
        };

        this.websocketService.sendMessage(WEBSOCKET_REQUEST_EVENT.connect_user_to_gym, JSON.stringify(body));
    }

    async startScanner() {
        this.currentGymId = await this.scannerService.startScanner();
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
