/* eslint-disable @typescript-eslint/naming-convention */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getTokenValue();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.authService.logout();
                    // return;
                }
                const error = err.error || err.statusText;
                return throwError(err);
            }),
        );
    }
}