import { BPRApiCreatedObject, BPR_ERROR_CODES, SignUpInput, Token, UserProfile } from '../../interfaces/interfaces';
import { Subject, firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn = false;
    loginSubject = new Subject<boolean>();

    constructor(private httpClient: HttpClient, private readonly router: Router) {}

    public getTokenValue(): string {
        return localStorage.getItem('token') as string;
    }

    public async login(email: string, password: string): Promise<string> {
        const response = await firstValueFrom(
            this.httpClient.post<Token>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authLogin}`, {
                email,
                password,
            }),
        ).catch((err) => {
            console.log(`[AUTH ERR]`, err);
            return err;
        });

        if (response?.statusCode === 401) {
            return BPR_ERROR_CODES.unauthorized;
        }

        if (response?.statusCode) {
            return BPR_ERROR_CODES.internal;
        }

        if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            this.loginSubject.next(true);
        }
        return response.accessToken;
    }

    public async getProfile(): Promise<UserProfile> {
        return firstValueFrom(
            this.httpClient.get<UserProfile>(`${environment.localApiUrl}${LOCAL_API_SERVICES.authProfile}`),
        );
    }

    public async validateUser(): Promise<boolean> {
        const token = this.getTokenValue();

        if (!token) {
            return false;
        }

        const profile = await this.getProfile().catch((err) => {
            console.log(`[AUTH ERR]`, err);
            return false;
        });

        if (!profile) {
            return false;
        }

        return true;
    }

    public async signup(body: SignUpInput): Promise<BPRApiCreatedObject> {
        return firstValueFrom(
            this.httpClient.post<BPRApiCreatedObject>(
                `${environment.localApiUrl}${LOCAL_API_SERVICES.authSignup}`,
                body,
            ),
        );
    }

    public async isProfileOwner(id: string): Promise<boolean> {
        const profile = await this.getProfile();

        if (profile.id !== id) {
            return false;
        }

        return true;
    }

    public logout(): void {
        this.isLoggedIn = false;
        localStorage.setItem(`token`, ``);
        this.loginSubject.next(false);
        void this.router.navigate([`login`]);
    }
}
