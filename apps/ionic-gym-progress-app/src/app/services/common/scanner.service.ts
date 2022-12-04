import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root',
})
export class ScannerService {
    constructor(private readonly toastService: ToastService) {}

    async startScanner() {
        // if (!environment.production) {
        //     // ! MOCK
        //     return `3dffeab7-b803-44c2-9829-40aa3770aef3`;
        //     // return `278e3def-aedf-4ccd-b4a1-0e2954b7f796`
        // }
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
