import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { MessageService } from 'primeng/api';
import { TrainingMachines } from 'src/app/interfaces/interfaces'
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-edit-training-machine-modal',
    templateUrl: './edit-training-machine-modal.component.html',
    styleUrls: ['./edit-training-machine-modal.component.scss'],
})
export class EditTrainingMachineModalComponent implements OnInit {
    editTrainingMachineForm: FormGroup;
    msg = '';
    editTrainingMacineState: boolean = true;
    trainingMachines:TrainingMachines[];
    //id:`58ed0d35-351b-43ff-b3b9-46e6f8fed883`;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly messageService: MessageService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        this.initEditTrainingMachineForm();

        const trainingMachine: TrainingMachines = this.config.data;
        this.editTrainingMachineForm.patchValue({
         name: trainingMachine.name,
         description: trainingMachine.description,
         location: trainingMachine.location,
         formulaForCalories: trainingMachine.formula_for_calories,
         video: trainingMachine.video,
         class: trainingMachine.class,
        });
    }
    async onSave() {
        console.log(this.trainingMachines);
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/{58ed0d35-351b-43ff-b3b9-46e6f8fed883}`;
        const requestBody = {
            name: this.editTrainingMachineForm.get('name')?.value,
            description: this.editTrainingMachineForm.get('decription')?.value,
            location: this.editTrainingMachineForm.get('location')?.value,
            formula_for_calories: this.editTrainingMachineForm.get('formula_for_calories')?.value,
            video: this.editTrainingMachineForm.get('video')?.value,
            class: this.editTrainingMachineForm.get('class')?.value,

        };

        const response = await firstValueFrom(this.httpClient.put<boolean>(url, requestBody));

        if (!response) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Training Machine update failed. Try again later',
            });
            this.ref.close(false);
            return;
        }
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Training Machine has been succesfully updated',
        });
        this.ref.close(this.config.data.id);
        
        // if (this.trainingMachine.name.trim()) {
        //     if (this.trainingMachine.id) {
        //         this.trainingMachine[this.findIndexById(this.trainingMachine.id)] = this.trainingMachine;
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //     }
    }

    private initEditTrainingMachineForm() {
        this.editTrainingMachineForm = new FormGroup({
            name: new FormControl(``),
            description: new FormControl(``),
            location: new FormControl(``),
            formula_for_calories: new FormControl(``),
            video: new FormControl(``),
            class: new FormControl(``),
        });
    }

    close(): void {
        this.ref.close(null);
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.trainingMachine.length; i++) {
    //         if (this.trainingMachine[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }
  
}

