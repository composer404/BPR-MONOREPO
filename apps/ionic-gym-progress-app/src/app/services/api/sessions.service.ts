import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import {ISessionsService} from '../../interfaces/sessions-service.interface';

@Injectable({
    providedIn: 'root',
})
export class SessionsService implements ISessionsService {
    constructor(private readonly httpClient: HttpClient) {}

    async getGymNumberOfParticipants(gymId: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.sessions}/participants/${gymId}`;
        return firstValueFrom(this.httpClient.get(url)).catch(() => null);
    }

    async getGymNumberOfUsedTrainingMachines(gymId: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.sessions}/machines/${gymId}`;
        return firstValueFrom(this.httpClient.get(url)).catch(() => null);
    }
}
