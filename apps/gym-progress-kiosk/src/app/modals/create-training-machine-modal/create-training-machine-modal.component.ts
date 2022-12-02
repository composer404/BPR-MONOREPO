import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoService } from 'src/app/services/info.service';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';

@Component({
    selector: `app-create-training-machine-modal`,
    templateUrl: `./create-training-machine-modal.component.html`,
    styleUrls: [`./create-training-machine-modal.component.scss`],
})
export class CreateTrainingMachineModalComponent implements OnInit {
    trainingMachineForm: FormGroup;

    constructor(
        private readonly trainingMachineService: TrainingMachinesService,
        private readonly ref: DynamicDialogRef,
        private readonly infoService: InfoService,
        
    ) {
        this.trainingMachineForm = new FormGroup({
            name: new FormControl(``, [Validators.required, Validators.minLength(1)]),
            description: new FormControl(``),
            location: new FormControl(``, [Validators.required]),
        });
    }

    ngOnInit(): void {}

    async createTrainingMachine(): Promise<void> {
        const response = await this.trainingMachineService.createTrainingMachine({
            name: this.trainingMachineForm?.get(`name`)?.value,
            description: this.trainingMachineForm?.get(`description`)?.value || ``,
            location: this.trainingMachineForm?.get(`location`)?.value || ``,
        });

        if (!response) {
            this.infoService.error(`Training machine creation failed. Try again later`);
            return;
        }
        this.infoService.success(`Training machine has been successfully created`);
        this.ref.close();
    }

    close(): void {
        this.ref.close(null);
    }
}
