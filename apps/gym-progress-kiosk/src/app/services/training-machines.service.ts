import { BPRApiCreatedObject, BPR_ADMIN_ACTIONS, TrainingMachines } from 'src/app/interfaces/interfaces';
import { EventEmitter, Injectable, Input, OnDestroy, Output } from '@angular/core';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { ITrainingMachinesService } from 'src/app/interfaces/training-machine-service.interface';
import {InfoService} from './info.service'
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingMachinesService implements ITrainingMachinesService {
    // !To change
    gymId = `278e3def-aedf-4ccd-b4a1-0e2954b7f796`;
    trainingMachines: TrainingMachines[];
    @Output()
    onRemove = new EventEmitter<string>();
    subscriptions: Subscription[] = [];


    constructor(private readonly httpClient: HttpClient,  private readonly infoService: InfoService,private readonly dialogService: DialogService) {}

    async getTrainingMachinesForGym(): Promise<TrainingMachines[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/gym/${this.gymId}`;
        return firstValueFrom(this.httpClient.get<TrainingMachines[]>(url)).catch(() => {
            return [];
        });
    }

    async createTrainingMachine(body: TrainingMachines): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${this.gymId}`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
            }),
        ).catch(() => {
            return null;
        });
    }

    async removeTrainingMachinesByGymId(): Promise<TrainingMachines[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${this.gymId}`;
        const reponse = await firstValueFrom(this.httpClient.delete<TrainingMachines[]>(url, {}));

        if (!reponse) {
            this.infoService.error('Cannot remove movie from the toplist. Try again later');
            // return;
        }

        this.trainingMachines = this.trainingMachines.filter((element) => {
            return element.gymId !== this.gymId;
        });
        return [];
    }

}
