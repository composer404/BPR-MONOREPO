import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';

@Component({
    selector: `app-create-training-machine-modal`,
    templateUrl: `./create-training-machine-modal.component.html`,
    styleUrls: [`./create-training-machine-modal.component.scss`],
})
export class CreateTrainingMachineModalComponent implements OnInit {
    trainingMachineForm: FormGroup;
    gymId:string;

    constructor(
        private readonly trainingMachineService: TrainingMachinesService,
        private readonly ref: DynamicDialogRef,
    ) {
        this.trainingMachineForm = new FormGroup({
            name: new FormControl(``, [Validators.required, Validators.minLength(1)]),
            description: new FormControl(``),
            location: new FormControl(``, [Validators.required]),
            formulaForCalories: new FormControl(``),
            video: new FormControl(``),
            class: new FormControl(``),
        });
    }

    ngOnInit(): void {}

    async createTrainingMachine(): Promise<void> {
        const response = await this.trainingMachineService.createTrainingMachine(this.gymId,{
            name: this.trainingMachineForm?.get(`name`)?.value,
            description: this.trainingMachineForm?.get(`description`)?.value || ``,
            location: this.trainingMachineForm?.get(`location`)?.value || ``,
            formula_for_calories: this.trainingMachineForm.get(`formulaForCalories`)?.value || ``,
            video: this.trainingMachineForm?.get(`video`)?.value || ``,
            class: this.trainingMachineForm?.get(`class`)?.value || ``,
        });

        if (response) {
            this.close();
        }
    }

    close(): void {
        this.ref.close(null);
    }
}
