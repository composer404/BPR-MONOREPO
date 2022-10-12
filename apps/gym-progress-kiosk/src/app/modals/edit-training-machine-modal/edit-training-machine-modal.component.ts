import { BPRApiCreatedObject, TrainingMachines } from 'src/app/interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { InfoService } from 'src/app/services/info.service';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { MessageService } from 'primeng/api';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-edit-training-machine-modal',
    templateUrl: './edit-training-machine-modal.component.html',
    styleUrls: ['./edit-training-machine-modal.component.scss'],
})
export class EditTrainingMachineModalComponent implements OnInit {
    editTrainingMachineForm: FormGroup;
    // editTrainingMacineState: boolean = true;
    trainingMachine: TrainingMachines;
    // @Input() id: string;

    constructor(
        // private readonly httpClient: HttpClient,
        private readonly infoService: InfoService,
        // private readonly messageService: MessageService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly trainingMachineService: TrainingMachinesService,
    ) {
        this.trainingMachine = this.config.data;
        this.editTrainingMachineForm = new FormGroup({
            name: new FormControl(``),
            description: new FormControl(``),
            location: new FormControl(``),
            formula_for_calories: new FormControl(``),
            video: new FormControl(``),
            class: new FormControl(``),
        });
    }

    ngOnInit(): void {
        // this.initEditTrainingMachineForm();

        this.trainingMachine = this.config.data;
        this.editTrainingMachineForm.patchValue({
            name: this.trainingMachine.name,
            description: this.trainingMachine.description,
            location: this.trainingMachine.location,
            formulaForCalories: this.trainingMachine.formula_for_calories,
            video: this.trainingMachine.video,
            class: this.trainingMachine.class,
        });
    }

    async onSave() {
        const body = {
            name: this.editTrainingMachineForm.get('name')?.value,
            description: this.editTrainingMachineForm.get('decription')?.value,
            location: this.editTrainingMachineForm.get('location')?.value,
            formula_for_calories: this.editTrainingMachineForm.get('formula_for_calories')?.value,
            video: this.editTrainingMachineForm.get('video')?.value,
            class: this.editTrainingMachineForm.get('class')?.value,
        };
        const response = this.trainingMachineService.editTrainingMachine(this.trainingMachine.id, body);
        // const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${this.trainingMachine.id}`;

        // const response = await firstValueFrom(this.httpClient.put<boolean>(url, requestBody));

        if (!response) {
            this.infoService.error(`Training Machine update failed. Try again later`);
            // this.messageService.add({
            //     severity: 'error',
            //     summary: 'Error',
            //     detail: 'Training Machine update failed. Try again later',
            // });
            // this.ref.close(false);
            return;
        }
        // this.messageService.add({
        //     severity: 'success',
        //     summary: 'Success',
        //     detail: 'Training Machine has been succesfully updated',
        // });
        // console.log(`here`);
        this.infoService.success(`Training Machine has been succesfully updated`);
        this.ref.close();
    }

    // private initEditTrainingMachineForm() {
    //     this.editTrainingMachineForm = new FormGroup({
    //         name: new FormControl(``),
    //         description: new FormControl(``),
    //         location: new FormControl(``),
    //         formula_for_calories: new FormControl(``),
    //         video: new FormControl(``),
    //         class: new FormControl(``),
    //     });
    // }

    close(): void {
        this.ref.close();
    }
}
