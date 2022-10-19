import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { TrainingMachine } from '../../interfaces/interfaces';
import {LOCAL_API_SERVICES} from '../../interfaces/local-api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class TrainingMachineService {

  trainingMachines: TrainingMachine[];

  constructor(private readonly httpClient: HttpClient) {}

  async getTrainingMachinesForGym(gymId: string): Promise<TrainingMachine[] | null> {
    const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/gym/${gymId}`;
    return firstValueFrom(this.httpClient.get<TrainingMachine[]>(url)).catch(() => null);
  }

  getTrainingMachineById(trainingMachineId: string): Observable<TrainingMachine> {
    return this.httpClient.get<TrainingMachine>(`${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${trainingMachineId}`);
  }
}
