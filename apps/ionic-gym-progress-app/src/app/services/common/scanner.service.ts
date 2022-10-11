import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ScannerService {
    constructor(private readonly toastService: ToastService) {}

    async startScanner() {
        if (!environment.production) {
            // ! MOCK
            return `dd186798-23bb-4834-a989-9b81b4ff1304`;
        }
        const allowed = await this.checkPermission();

        if (allowed) {
            BarcodeScanner.hideBackground();
            const result = await BarcodeScanner.startScan();

            if (result.hasContent) {
                return result.content;
            } else {
                this.toastService.error(`Scanned object is invalid`);
            }
        } else {
            this.toastService.error(`No camera permissions!`);
        }
    }

    private async checkPermission() {
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
}
