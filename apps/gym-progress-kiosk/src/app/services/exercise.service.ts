/* eslint-disable @typescript-eslint/naming-convention */

import { BPRApiCreatedObject, Exercise, ExerciseType } from 'src/app/interfaces/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import {IExerciseService} from "../interfaces/exercise-service.interface";

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
        const response = await firstValueFrom(this.httpClient.delete<boolean>(url)).catch(() => {
            return null;
        });

        if (!response) {
            return false;
        }
        return true;
    }

    async editExercise(id: string, body: Partial<Exercise>): Promise<boolean | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/${id}`;
        return firstValueFrom(this.httpClient.put<boolean>(url, body)).catch(() => null);
    }

    async getActivityTypeId(activityid: string): Promise<Exercise | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingTypes}/${activityid}`;
        return firstValueFrom(this.httpClient.get<Exercise>(url)).catch(() => null);
    }

    async getAllExerciseTypes(): Promise<ExerciseType[] >{
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingTypes}/all`;
        return firstValueFrom(this.httpClient.get<ExerciseType[]>(url)).catch(() => {
            return [];
        });
    }

}
