import { ConfirmDialogInput, DialogResponse } from 'src/app/interfaces/interfaces';

import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private readonly alertController: AlertController) {}

    async openConfirmationDialog(confirmDialogInput: ConfirmDialogInput): Promise<DialogResponse> {
        const alert = await this.alertController.create({
            header: confirmDialogInput.header,
            buttons: [
                {
                    text: confirmDialogInput.cancelText || `Cancel`,
                    role: confirmDialogInput.cancelRole || `cancel`,
                    handler: confirmDialogInput.cancelFn,
                },
                {
                    text: confirmDialogInput.confirmText || `Confirm`,
                    role: confirmDialogInput.cancelRole || `confirm`,
                    handler: confirmDialogInput.confirmFn,
                },
            ],
        });
        await alert.present();
        const result = await alert.onDidDismiss();

        return {
            data: result.data,
            role: result.role,
        };
    }
}
