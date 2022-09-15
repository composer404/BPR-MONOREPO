import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private readonly httpClient: HttpClient) {}

    async deleteAccount() {
        const response = await firstValueFrom(
            this.httpClient.delete(`${environment.localApiUrl}${LOCAL_API_SERVICES.users}`),
        ).catch((err) => {
            console.log(`[API ERR - DELETE ACCOUNT]`, err);
            return null;
        });

        if (!response) {
            return false;
        }
        return true;
    }
}
