import { BPRApiCreatedObject, Exercise } from '../../interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    constructor(private readonly httpClient: HttpClient) {}

    async createExercise(trainingId: string, body: Partial<Exercise>) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/${trainingId}`;
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(url, {
                ...body,
            }),
        ).catch(() => null);
    }

    async getExercisesForTrainings(trainingId: string): Promise<Exercise[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/training/${trainingId}`;
        return firstValueFrom(this.httpClient.get<Exercise[]>(url)).catch(() => null);
    }

    async getExerciseById(id: string): Promise<Exercise | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/${id}`;
        return firstValueFrom(this.httpClient.get<Exercise>(url)).catch(() => null);
    }
}
