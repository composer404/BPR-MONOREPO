import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IScannerService } from 'src/app/interfaces/scanner.interface';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root',
})
export class ScannerService implements IScannerService {
    constructor(private readonly toastService: ToastService) {}

    async startScanner() {
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
