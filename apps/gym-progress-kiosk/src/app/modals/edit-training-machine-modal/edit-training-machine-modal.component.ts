import { TrainingMachines } from 'src/app/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InfoService } from 'src/app/services/info.service';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';

@Component({
    selector: 'app-edit-training-machine-modal',
    templateUrl: './edit-training-machine-modal.component.html',
    styleUrls: ['./edit-training-machine-modal.component.scss'],
})
export class EditTrainingMachineModalComponent implements OnInit {
    editTrainingMachineForm: FormGroup;
    trainingMachine: TrainingMachines;


    constructor(
        private readonly infoService: InfoService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly trainingMachineService: TrainingMachinesService,
    ) {
        this.trainingMachine = this.config.data;
        this.editTrainingMachineForm = new FormGroup({
            name: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            location:new FormControl(``,[Validators.required]),
        });
    }

    ngOnInit(): void {
        this.trainingMachine = this.config.data;
        this.editTrainingMachineForm.patchValue({
            name: this.trainingMachine.name,
            description: this.trainingMachine.description,
            location: this.trainingMachine.location,
        });
    }

    async onSave() {
        const body = {
            name: this.editTrainingMachineForm.get('name')?.value,
            description: this.editTrainingMachineForm.get('description')?.value,
            location: this.editTrainingMachineForm.get('location')?.value,
        };
        const response = this.trainingMachineService.editTrainingMachine(this.trainingMachine.id, body);

        if (!response) {
            this.infoService.error(`Training Machine update failed. Try again later`);
            return;
        }
        this.infoService.success(`Training Machine has been successfully updated`);
        this.ref.close();
    }


    close(): void {
        this.ref.close();
    }
}
