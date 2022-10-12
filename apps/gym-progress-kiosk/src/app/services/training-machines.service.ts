import { BPRApiCreatedObject, TrainingMachines } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { ITrainingMachinesService } from 'src/app/interfaces/training-machine-service.interface';
// import { InfoService } from './info.service';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingMachinesService implements ITrainingMachinesService {
    // !To change
    gymId = `dd186798-23bb-4834-a989-9b81b4ff1304`;
    trainingMachines: TrainingMachines[] = [];
    subscriptions: Subscription[] = [];

    constructor(private readonly httpClient: HttpClient) {}

    async getTrainingMachinesForGym(): Promise<TrainingMachines[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/gym/${this.gymId}`;
        return firstValueFrom(this.httpClient.get<TrainingMachines[]>(url)).catch(() => {
            return [];
        });
    }

    async createTrainingMachine(body: Partial<TrainingMachines>): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${this.gymId}`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
            }),
        ).catch(() => {
            return null;
        });
    }

    async editTrainingMachine(
        trainingMachineId: string,
        trainingMachineBody: Partial<TrainingMachines>,
    ): Promise<boolean> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${trainingMachineId}`;
        const response = await firstValueFrom(
            this.httpClient.put<boolean>(url, {
                ...trainingMachineBody,
            }),
        ).catch(() => {
            return null;
        });

        if (!response) {
            return false;
        }
        return true;
    }

    async removeTrainingMachinesById(trainingMachineId: string): Promise<boolean> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${trainingMachineId}`;
        const response = await firstValueFrom(this.httpClient.delete<boolean>(url)).catch(() => {
            return null;
        });

        if (!response) {
            return false;
        }
        return true;
    }

    async getTrainingMachineById(id: string): Promise<TrainingMachines[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${id}`;
        return firstValueFrom(this.httpClient.get<TrainingMachines[]>(url)).catch(() => {
            return [];
        });
    }
}
