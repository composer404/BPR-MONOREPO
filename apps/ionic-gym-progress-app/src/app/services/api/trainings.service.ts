import { BPRApiCreatedObject, Training, TrainingWithExercises } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import {ITrainingsService} from '../../interfaces/trainings-service.interface';

@Injectable({
    providedIn: 'root',
})
export class TrainingService implements ITrainingsService {
    constructor(private readonly httpClient: HttpClient) {}

    async createTraining(body: Partial<Training>): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
            }),
        ).catch((err) => {
            console.log(`[API ERR - CREATE TRAINING]`, err);
            return null;
        });
    }

    async createTrainingWithExercises(body: Partial<Training>): Promise<BPRApiCreatedObject | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/withExercises`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
            }),
        ).catch((err) => {
            console.log(`[API ERR - CREATE TRAINING]`, err);
            return null;
        });
    }
    async getUserTrainingForGym(gymId: string): Promise<Training[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/user/all/${gymId}`;
        return firstValueFrom(this.httpClient.get<Training[]>(url)).catch(() => null);
    }

    getTrainingById(trainingId: string): Promise<Training> | null {
        return firstValueFrom(
            this.httpClient.get<Training>(`${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`),
        ).catch((err) => {
            console.log(`[API ERR - GET TRAINING]`, err);
            return null;
        });
    }

    async getTrainingsCreatedByAdmin(gymId: string): Promise<Training[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/admin/all/${gymId}`;
        return firstValueFrom(this.httpClient.get<Training[] | null>(url)).catch(() => null);
    }

    async deleteTraining(trainingId: string) {
        return firstValueFrom(
            this.httpClient.delete<boolean>(`${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`),
        ).catch((err) => {
            console.log(`[API ERR - GET TRAINING]`, err);
            return null;
        });
    }

    async editTraining(trainingId: string, body: Partial<Training>) {
        return firstValueFrom(
            this.httpClient.put<boolean>(
                `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`,
                body,
            ),
        ).catch((err) => {
            console.log(`[API ERR - GET TRAINING]`, err);
            return null;
        });
    }
}
