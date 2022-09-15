import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastController: ToastController) {}

    async success(message: string, position?: `bottom` | `middle` | `top`) {
        await this.generalToast(message, `success`, position);
    }

    async error(message: string, position?: `bottom` | `middle` | `top`) {
        await this.generalToast(message, `error`, position);
    }

    async warning(message: string, position?: `bottom` | `middle` | `top`) {
        await this.generalToast(message, `danger`, position);
    }

    private async generalToast(message: string, color: any, position?: `bottom` | `middle` | `top`) {
        const toast = await this.toastController.create({
            message,
            color,
            position: position ?? `bottom`,
            duration: 1000,
        });

        await toast.present();
    }
}
