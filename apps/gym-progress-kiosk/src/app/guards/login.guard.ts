import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { IAuthService } from '../interfaces/auth-service.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    constructor(private authService: IAuthService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const validationResult = await this.authService.validateUser();
        if (validationResult) {
            const profile = await this.authService.getProfile();
            void this.router.navigate([`/profile/${profile.id}`]);
            return false;
        }
        return true;
    }
}
