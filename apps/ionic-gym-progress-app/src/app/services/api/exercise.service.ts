/* eslint-disable @typescript-eslint/naming-convention */
import { BPRApiCreatedObject, Exercise, ExerciseType } from '../../interfaces/interfaces';
import { firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { environment } from '../../../environments/environment';
import {IExerciseService} from '../../interfaces/exercise-service.interface';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService implements IExerciseService {
    constructor(private readonly httpClient: HttpClient) {}

    async createExercise(trainingId: string, body: Partial<Exercise>): Promise<BPRApiCreatedObject | null> {
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

    async deleteExercise(id: string): Promise<boolean | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/${id}`;
        return firstValueFrom(this.httpClient.delete<boolean>(url)).catch(() => null);
    }

    async editExercise(id: string, body: Partial<Exercise>): Promise<boolean | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/${id}`;
        return firstValueFrom(this.httpClient.put<boolean>(url, body)).catch(() => null);
    }

    async getActivityTypeId(activityid: string): Promise<Exercise | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingTypes}/${activityid}`;
        return firstValueFrom(this.httpClient.get<Exercise>(url)).catch(() => null);
    }

    async getAllExerciseTypes(): Promise<ExerciseType[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingTypes}/all`;
        return firstValueFrom(this.httpClient.get<ExerciseType | null>(url)).catch(() => null);
    }

    async calculateExerciseCalories(activityId: string, activityMin: number, weight: number): Promise<number> {
        const url = `${environment.fintessApiUrl}/burnedcalorie`;
        const response = await firstValueFrom(
            this.httpClient.get(url, {
                params: {
                    activityid: activityId,
                    activitymin: activityMin,
                    weight,
                },
                headers: {
                    'X-RapidAPI-Key': environment.API_KEY,
                    'X-RapidAPI-Host': environment.API_HOST,
                },
            }),
        ).catch(() => null);

        if (!response) {
            return null;
        }
        return parseFloat(response.data.burnedCalorie);
    }
}
