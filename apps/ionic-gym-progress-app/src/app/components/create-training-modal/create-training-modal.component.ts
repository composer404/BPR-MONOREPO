import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IonModal } from '@ionic/angular';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-create-training-modal',
    templateUrl: './create-training-modal.component.html',
    styleUrls: ['./create-training-modal.component.scss'],
})
export class CreateTrainingModalComponent {
    @ViewChild(IonModal) ionModal: IonModal;

    @Input()
    gymId: string;

    trainingForm: FormGroup;

    constructor(private readonly trainingService: TrainingService, private readonly toastService: ToastService) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    cancelTrainingCreation() {
        this.ionModal.dismiss(null, 'cancel');
    }

    createTraining() {
        this.ionModal.dismiss(null, 'confirm');
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
