import {AdminSignupInput, TrainingMachines} from 'src/app/interfaces/interfaces'
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';

@Component({
    selector: `app-list-view-component`,
    templateUrl: `./list-view.component.html`,
    styleUrls: [`./list-view.component.scss`],
})

export class ListViewComponent {
    admin: AdminSignupInput;
    trainingMachines: TrainingMachines[];

    constructor(
        private readonly dialogService: DialogService,
        private readonly trainingMchinesService: TrainingMachinesService,
    ) {}


    async getTrainingMachinesForGym() {
        const response = await this.trainingMchinesService.getTrainingMachinesForGym(this.admin.gymId);
        if (response) {
            this.trainingMachines = response;
        }
    }
    onRemoveTrainingMachine(gymId: string): void {
        this.trainingMachines = this.trainingMachines.filter((element) => {
            return element.gymId !== gymId;
        });
    }

}