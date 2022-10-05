import {AdminSignupInput, TrainingMachines, TrainingMachinesDetails} from 'src/app/interfaces/interfaces'
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { Subscription } from 'rxjs';
import { TrainingMachinesComponent } from 'src/app/pages/list/training-machines/training-machines.component'
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-list-view-component`,
    templateUrl: `./list-view.component.html`,
    styleUrls: [`./list-view.component.scss`],
})

export class ListViewComponent{
   // training:TrainingMachines;
    trainingMachines: TrainingMachines[];
    subscriptions: Subscription[] = [];
    gymId:'278e3def-aedf-4ccd-b4a1-0e2954b7f796';

    constructor(
        private readonly dialogService: DialogService,
        private readonly httpClient: HttpClient,
        private readonly trainingMchinesService: TrainingMachinesService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}
    // ngOnInit(): void {
    //     this.getTrainingMachinesByGymId(this.config.data.gymId);
    // }
    openCreateModal() {
        const ref = this.dialogService.open(TrainingMachinesComponent, {
            header: `Add new training machine`,
            width: `100%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe((data) => {
                if (data) {
                    this.getTrainingMachinesByGymId(data);
                }
            }),
        );
    }

    private getTrainingMachinesByGymId(gymId: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/gym/${gymId}`;
        this.subscriptions.push(
            this.httpClient.get<TrainingMachinesDetails>(url).subscribe((response) => {
                if (response) {
                    this.trainingMachines.push(response);
                    return;
                }
                //error message;
            }),
        );
    }
    
    // async getTrainingMachinesForGym() {
    //     const response = await this.trainingMchinesService.getTrainingMachinesForGym(this.training.gymId);
    //     if (response) {
    //         this.trainingMachines = response;
    //     }
    // }
    // onRemoveTrainingMachine(gymId: string): void {
    //     this.trainingMachines = this.trainingMachines.filter((element) => {
    //         return element.gymId !== gymId;
    //     });
    // }

    

}