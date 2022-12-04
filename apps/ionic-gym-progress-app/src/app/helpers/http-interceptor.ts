/* eslint-disable @typescript-eslint/naming-convention */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ToastService } from '../services/common/toast.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private toastService: ToastService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getTokenValue();
        request = request.clone({
            setHeaders: {
                'ngrok-skip-browser-warning': 'any',
            },
        });
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'any',
                },
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.toastService.error(`Inserted credentails are invalid!`);
                    this.authService.logout();
                    return;
                }
                this.toastService.error(`Server error. Try again later...`);
                const error = err.error || err.statusText;
                return throwError(error);
            }),
        );
    }
}
