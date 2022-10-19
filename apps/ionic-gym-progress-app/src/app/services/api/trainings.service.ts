import { BPRApiCreatedObject, BPRUser, Gym, Training } from 'src/app/interfaces/interfaces';
import { Observable, firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    constructor(private readonly httpClient: HttpClient) {}

    async createTraining(body: Partial<Training>) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
            }),
        ).catch(() => null);
    }

    async getUserTrainingForGym(gymId: string): Promise<Training[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/user/all/${gymId}`;
        return firstValueFrom(this.httpClient.get<Training[]>(url)).catch(() => null);
    }

    // async getTrainingById(id: string): Promise<Training | null> {
    //     const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${id}`;
    //     return firstValueFrom(this.httpClient.get<Training>(url)).catch(() => null);
    // }

    getTrainingById(trainingId: string): Observable<Training> {
        return this.httpClient.get<Training>(`${environment.localApiUrl}${LOCAL_API_SERVICES.trainings}/${trainingId}`);
    }

    async deleteTraining(trainingId: string) {}

    async editTraining(trainingId: string, body: Partial<Training>) {}
}
