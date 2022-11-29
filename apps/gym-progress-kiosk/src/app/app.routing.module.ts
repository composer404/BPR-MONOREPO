import { RouterModule, Routes } from '@angular/router';

import { AdminLoginModule } from './pages/admin-login/admin-login.module';
import { AdminSignupModule } from './pages/admin-signup/admin-signup.module';
import { NgModule } from '@angular/core';
import { TrainingDetailsModule } from './pages/training-details/training-details.module';
import { TrainingListModule } from './pages/training-list/training-list.module';
import { TrainingMachinesListModule } from './pages/training-machines-list/training-machines-list.module';
import { WelcomeModule } from './pages/welcome/welcome.module';

const routes: Routes = [
    {
        path: `welcome`,
        loadChildren: () => {
            return WelcomeModule;
        },
    },
    {
        path: `login`,
        loadChildren: () => {
            return AdminLoginModule;
        },
    },
    {
        path: `signup`,
        loadChildren: () => {
            return AdminSignupModule;
        },
    },
    {
        path: `training-machines`,
        loadChildren: () => {
            return TrainingMachinesListModule;
        },
    },
    {
        path: `trainings`,
        loadChildren: () => {
            return TrainingListModule;
        },
    },
    {
        path: `exercises`,
        loadChildren: () => {
            return TrainingDetailsModule;
        },
    },
    {
        path: `**`,
        redirectTo: `welcome`,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
