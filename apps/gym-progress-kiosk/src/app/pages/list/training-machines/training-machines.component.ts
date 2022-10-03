// import * as environment from '../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { API_ERROR_CODES } from '../../../interfaces/interfaces';
import { AuthService } from '../../../services/auth/auth.service';
import { ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { InfoService } from '../../../services/info.service';
import { LOCAL_API_SERVICES } from '../../../interfaces/local-api.endpoints'
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-training-machines-component`,
    templateUrl: `./training-machines.component.html`,
    styleUrls: [`./training-machines.component.scss`],
})
export class TrainingMachinesComponent implements OnInit  {
    public trainingMachineForm: FormGroup;

    constructor(
        private readonly httpClient: HttpClient,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        this.trainingMachineForm = new FormGroup({
            name: new FormControl(``, [Validators.required, Validators.minLength(1)]),
            description: new FormControl(``, [Validators.required, Validators.minLength(10)]),
            locatiom: new FormControl(``),
            formulaForCalories:new FormControl(``),
            video: new FormControl(``),
            availability:new FormControl(``),
            // gymId:new FormControl(``),
            // exerciseId:new FormControl(``),
        });
    }

    createTrainingMachine(): void {
        this.httpClient
            .post<{ id: string }>(`${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}`, {
                name: this.trainingMachineForm.get('name').value,
                description: this.trainingMachineForm.get('description').value,
                locatiom: this.trainingMachineForm.get('location').value,
                formulaForCalories:this.trainingMachineForm.get('formulaForCalories').value,
                video: this.trainingMachineForm.get('video').value,
                availability: this.trainingMachineForm.get('availability').value,
                gymId:environment.gymId,
                exerciseId:environment.exerciseId,
            })
            .subscribe((response) => {
                if (!response?.id) {
                    //error
                    return;
                }

               this.ref.close(response.id);
            });
    }

    close(): void {
        this.ref.close(null);
    }
}