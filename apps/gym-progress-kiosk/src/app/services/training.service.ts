import { BPRApiCreatedObject, Training } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { ITrainingService } from '../interfaces/training-service.interface';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrainingService implements ITrainingService {
    constructor(private readonly httpClient: HttpClient) {}

    async createTraining(body: Partial<Training>): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
                isCreatedByAdmin: true,
                gymId: environment.gymId,
            }),
        ).catch((err) => {
            console.log(`[API ERR - CREATE TRAINING]`, err);
            return null;
        });
    }

    async getTrainingForGym(): Promise<Training[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${environment.gymId}`;
        return firstValueFrom(this.httpClient.get<Training[]>(url)).catch(() => {
            return [];
        });
    }
    async getAdminTrainingForGym(): Promise<Training[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/admin/all/${environment.gymId}`;
        return firstValueFrom(this.httpClient.get<Training[]>(url)).catch(() => null);
    }

    getTrainingById(trainingId: string): Promise<Training[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`;
        return firstValueFrom(this.httpClient.get<Training[]>(url)).catch(() => {
            return [];
        });
    }

    async deleteTraining(trainingId: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`;
        const response = await firstValueFrom(this.httpClient.delete<boolean>(url)).catch(() => {
            return null;
        });

        if (!response) {
            return false;
        }
        return true;
    }

    async editTraining(trainingId: string, body: Partial<Training>) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`;
        const response = await firstValueFrom(
            this.httpClient.put<boolean>(url, {
                ...body,
            }),
        ).catch(() => {
            return null;
        });

        if (!response) {
            return false;
        }
        return true;
    }
}
