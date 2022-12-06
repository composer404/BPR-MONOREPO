import { Observable, firstValueFrom } from 'rxjs';
import { TrainingMachine, UsedTrainingMachine } from '../../interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { environment } from '../../../environments/environment';
import {ITrainingMachineService} from '../../interfaces/training-machine-service.interface';

@Injectable({
    providedIn: 'root',
})
export class TrainingMachineService implements ITrainingMachineService{
    trainingMachines: TrainingMachine[];

    constructor(private readonly httpClient: HttpClient) {}

    async getTrainingMachinesForGym(gymId: string): Promise<TrainingMachine[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/gym/${gymId}`;
        return firstValueFrom(this.httpClient.get<TrainingMachine[]>(url)).catch(() => null);
    }

    getTrainingMachineById(trainingMachineId: string): Observable<TrainingMachine> {
        return this.httpClient.get<TrainingMachine>(
            `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${trainingMachineId}`,
        );
    }

    async getCurrentUsedTrainingMachinesIds(gymId: string): Promise<UsedTrainingMachine[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.sessions}/machines/${gymId}`;
        return firstValueFrom(this.httpClient.get<number[]>(url)).catch(() => null);
    }

    async changeTrainingMachineStatus(
        trainingMachineId: string,
        gymId: string,
        status: boolean,
        exerciseId: string,
    ): Promise<boolean | null> {
        const statusPath = status ? `enable` : `disable`;
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${gymId}/${statusPath}/${trainingMachineId}`;
        return firstValueFrom(
            this.httpClient.put<boolean>(url, {
                exerciseId,
            }),
        ).catch(() => null);
    }
}
