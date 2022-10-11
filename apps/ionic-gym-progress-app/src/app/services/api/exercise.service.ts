import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {BPRApiCreatedObject, Exercise, Training} from '../../interfaces/interfaces';
import {LOCAL_API_SERVICES} from '../../interfaces/local-api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {

  exercises: Exercise[];

  constructor(private readonly httpClient: HttpClient) {}

  async createExercise(body: Partial<Exercise>) {
    const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}`;
    return firstValueFrom(
      this.httpClient.post<BPRApiCreatedObject>(url, {
        ...body,
      }),
    ).catch(() => null);
  }

  // addExercise(trainingId: string, config: any): Promise<BPRApiCreatedObject> {
  //   const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/exercises/${trainingId}`;
  //   return firstValueFrom(
  //     this.httpClient.post<BPRApiCreatedObject>(url, {
  //       title: config.data.title,
  //       description: config.data.description,
  //       training_type: config.data.type,
  //       quantity: config.data.quantity,
  //       muscle_group: config.data.group,
  //       trainingMachineId: config.data.trainingMachineId
  //     }),
  //   );
  // }

  async getExercisesForTrainings(trainingId: string): Promise<Exercise[] | null> {
    const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/training/${trainingId}`;
    return firstValueFrom(this.httpClient.get<Exercise[]>(url)).catch(() => null);
  }

  async getExerciseById(id: string): Promise<Exercise | null> {
    const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}/${id}`;
    return firstValueFrom(this.httpClient.get<Exercise>(url)).catch(() => null);
  }

  // loadTrainingExercises() {
  //   const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.exercises}`;
  //   this.httpClient.get<Exercise[]>(url).subscribe((response) => {
  //     if (!response) {
  //       this.toastService.error('The exercises were not successfully added to the training', 'bottom');
  //       return;
  //     }
  //     this.toastService.success('The exercises were successfully added to the training');
  //     this.exercises = response;
  //   });
  // }
}
