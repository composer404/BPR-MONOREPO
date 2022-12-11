import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IInfoService } from 'src/app/interfaces/info-service.interface';
import { ITrainingService } from 'src/app/interfaces/training-service.interface';

@Component({
    selector: 'app-create-training-modal',
    templateUrl: './create-training-modal.component.html',
    styleUrls: ['./create-training-modal.component.scss'],
})
export class CreateTrainingModalComponent implements OnInit {
    trainingForm: FormGroup;

    constructor(
        private readonly trainingService: ITrainingService,
        private readonly infoService: IInfoService,
        private ref: DynamicDialogRef,
    ) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    ngOnInit(): void {}

    async createTraining(): Promise<void> {
        const response = await this.trainingService.createTraining({
            title: this.trainingForm?.get(`title`)?.value,
            type: this.trainingForm?.get(`type`)?.value || ``,
            description: this.trainingForm?.get(`description`)?.value || ``,
            comment: this.trainingForm.get(`comment`)?.value || ``,
        });

        if (!response) {
            this.infoService.error(`Training creation failed. Try again later`);
            return;
        }
        this.infoService.success(`Training has been successfully created`);
        this.ref.close();
    }

    close(): void {
        this.ref.close(null);
    }
}
