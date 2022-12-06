import { Observable, firstValueFrom } from 'rxjs';

import { BPRUser } from 'src/app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import {IUserService} from '../../interfaces/user-service.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService implements IUserService {
    constructor(private readonly httpClient: HttpClient) {}

    getUserById(userId: string): Observable<BPRUser> {
        return this.httpClient.get<BPRUser>(`${environment.localApiUrl}${LOCAL_API_SERVICES.users}/${userId}`);
    }

    updateUser(body: Partial<BPRUser>): Observable<boolean> {
        return this.httpClient.put<boolean>(`${environment.localApiUrl}${LOCAL_API_SERVICES.users}`, body);
    }

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
