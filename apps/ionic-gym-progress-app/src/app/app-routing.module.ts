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
        path: 'profile/:id/edit',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/edit-account/edit-account.module').then((m) => m.EditPageModule),
    },
    {
        path: 'profile/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    },
    {
        path: 'list/list-exercises',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./pages/list/list-exercises/list-exercises.module').then((m) => m.ListExercisesPageModule),
    },
    {
        path: 'list/list-machines',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./pages/list/list-machines/list-machines.module').then((m) => m.ListMachinesPageModule),
    },
    {
        path: 'list/list-gyms',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/list/list-gyms/list-gyms.module').then((m) => m.ListGymsPageModule),
    },
    {
        path: 'list',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/list/list.module').then((m) => m.ListPageModule),
    },
    {
        path: 'profile-tabs',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/profile-tabs/profile-tabs.module').then((m) => m.ProfileTabsPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
