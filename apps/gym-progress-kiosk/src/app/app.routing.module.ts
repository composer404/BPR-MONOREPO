import { RouterModule, Routes } from '@angular/router';

import { AdminLoginModule } from './pages/admin-login/admin-login.module';
import { AdminSignupModule } from './pages/admin-signup/admin-signup.module';
import { MachineListModule } from './pages/list/machine-list.module';
import { NgModule } from '@angular/core';
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
            return MachineListModule;
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
