import { BPRApiCreatedObject, TrainingSession } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingSessionService {
    constructor(private readonly httpClient: HttpClient) {}

    async createTrainingSession(trainingId: string): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/${trainingId}`;
        return firstValueFrom(this.httpClient.post<BPRApiCreatedObject | null>(url, {})).catch(() => null);
    }

    async getTrainingSessionById(id: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/${id}`;
        return firstValueFrom(this.httpClient.get<TrainingSession | null>(url, {})).catch(() => null);
    }
}
