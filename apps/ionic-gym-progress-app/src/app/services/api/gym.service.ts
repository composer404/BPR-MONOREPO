import { Gym } from 'src/app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GymService {
    constructor(private readonly httpClient: HttpClient) {}

    async getGymsByName(name: string): Promise<Gym[] | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.gyms}/name/${name}`;
        return firstValueFrom(this.httpClient.get<Gym[]>(url)).catch(() => null);
    }

    async getGymById(id: string): Promise<Gym | null> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.gyms}/${id}`;
        return firstValueFrom(this.httpClient.get<Gym>(url)).catch(() => null);
    }
}
