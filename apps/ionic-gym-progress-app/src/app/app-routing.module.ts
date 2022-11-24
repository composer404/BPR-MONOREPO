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
        path: 'profile-tabs',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/profile-tabs/profile-tabs.module').then((m) => m.ProfileTabsPageModule),
    },
    {
        path: `profile/:id/active-training/gym/:gymId/session/:sessionId`,
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./pages/active-training/active-training.module').then((m) => m.ActiveTrainingPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
