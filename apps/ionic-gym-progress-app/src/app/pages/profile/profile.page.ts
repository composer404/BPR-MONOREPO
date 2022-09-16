import { AuthService } from 'src/app/services/auth/auth.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    scannedValue;
    scanActive = false;

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly dialogService: DialogService,
    ) {}

    logout() {
        this.authService.logout();
    }

    async deleteAccount() {
        this.presentConfirmationDialog();
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
        const allowed = await this.checkPermission();

        if (allowed) {
            this.scanActive = true;
            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan();

            if (result.hasContent) {
                this.scanActive = false;
                alert(result.content); //The QR content will come out here
                //Handle the data as your heart desires here
            } else {
                alert('NO DATA FOUND!');
            }
        } else {
            alert('NOT ALLOWED!');
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

    private async presentConfirmationDialog() {
        await this.dialogService.openConfirmationDialog({
            header: `Are you sure?`,
            confirmFn: async () => {
                await this.userService.deleteAccount();
                this.logout();
            },
        });
    }
}
