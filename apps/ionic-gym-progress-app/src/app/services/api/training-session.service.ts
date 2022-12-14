import { BPRApiCreatedObject, SessionExercise, TrainingSession } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import {ITrainingSessionService} from '../../interfaces/training-session-service.interface';

@Injectable({
    providedIn: 'root',
})
export class TrainingSessionService implements ITrainingSessionService{
    constructor(private readonly httpClient: HttpClient) {}

    async createTrainingSession(trainingId: string): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/${trainingId}`;
        return firstValueFrom(this.httpClient.post<BPRApiCreatedObject | null>(url, {})).catch(() => null);
    }

    async getTrainingSessionById(id: string): Promise<TrainingSession | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/${id}`;
        return firstValueFrom(this.httpClient.get<TrainingSession | null>(url, {})).catch(() => null);
    }

    async updateTrainingSessionExercise(id: string, body: Partial<SessionExercise>) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/exercise/${id}`;
        return firstValueFrom(this.httpClient.put(url, body)).catch(() => null);
    }

    async updateTrainingSession(id: string, body: Partial<TrainingSession>) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/${id}`;
        return firstValueFrom(this.httpClient.put(url, body)).catch(() => null);
    }

    async getSessionsByIndex(index: number): Promise<TrainingSession[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/statistics/list`;
        return firstValueFrom(
            this.httpClient.get<TrainingSession[] | null>(url, {
                params: {
                    index,
                },
            }),
        );
    }

    async getSessionsByTimePeriod(startDate: string, endDate: string): Promise<TrainingSession[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingSessions}/statistics/timeframe`;
        return firstValueFrom(
            this.httpClient.get<TrainingSession[] | null>(url, {
                params: {
                    startDate,
                    endDate,
                },
            }),
        );
    }
}
