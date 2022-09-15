import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        canActivate: [LoginGuard],
        loadChildren: () => import('./pages/introduction/introduction.module').then((m) => m.IntroductionPageModule),
    },
    {
        path: 'login',
        canActivate: [LoginGuard],
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: 'signup',
        canActivate: [LoginGuard],
        loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule),
    },
    {
        path: 'profile/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
