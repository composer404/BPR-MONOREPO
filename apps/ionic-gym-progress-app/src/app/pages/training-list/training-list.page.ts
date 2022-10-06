import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IonModal } from '@ionic/angular';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.page.html',
    styleUrls: ['./training-list.page.scss'],
})
export class TrainingListPage {
    @ViewChild(IonModal) newTrainingModal: IonModal;

    trainingForm: FormGroup;
    gymId: string = `dd186798-23bb-4834-a989-9b81b4ff1304`;

    constructor(private readonly trainingService: TrainingService, private readonly toastService: ToastService) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    /* ------------------------------ MODAL ACTIONS ----------------------------- */

    cancelTrainingCreation() {
        this.newTrainingModal.dismiss(null, 'cancel');
    }

    createTraining() {
        this.newTrainingModal.dismiss(null, 'confirm');
    }

    onWillDismissModal(event: any) {
        if (event.detail.role !== `confirm`) {
            return;
        }

        const result = this.trainingService.createTraining({
            title: this.trainingForm.get(`title`).value,
            type: this.trainingForm.get(`type`).value,
            description: this.trainingForm.get(`description`).value,
            comment: this.trainingForm.get(`comment`).value,
            gymId: this.gymId,
        });

        if (!result) {
            this.toastService.error(`Cannot create training. Try again later.`);
            return;
        }
        this.toastService.success(`Successfully created new training`);
    }
}
