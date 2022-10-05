import { BPRApiCreatedObject, TrainingMachines } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { ITrainingMachinesService } from 'src/app/interfaces/training-machine-service.interface';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingMachinesService implements ITrainingMachinesService {
    // !To change
    gymId = `dd186798-23bb-4834-a989-9b81b4ff1304`;

    constructor(private readonly httpClient: HttpClient) {}

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
}
