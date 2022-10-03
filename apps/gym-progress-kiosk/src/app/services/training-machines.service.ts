import { HttpClient } from '@angular/common/http';
import { ITrainingMachinesService } from 'src/app/interfaces/training-machine-service.interface';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { TrainingMachines } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingMachinesService implements ITrainingMachinesService {
    constructor(private readonly httpClient: HttpClient) {}

    getTrainingMachinesForGym(gymId: string): Promise<TrainingMachines[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${gymId}`;
        return firstValueFrom(this.httpClient.get<TrainingMachines[] | null>(url));
    }
}