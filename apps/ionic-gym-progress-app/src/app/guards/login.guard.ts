import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const validationResult = await this.authService.validateUser();
        if (validationResult) {
            const profile = await this.authService.getProfile();
            void this.router.navigate([`/profile-tabs/profile/${profile.id}`]);
            return false;
        }
        return true;
    }
}
