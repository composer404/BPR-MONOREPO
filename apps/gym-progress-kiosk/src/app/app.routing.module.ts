import { RouterModule, Routes } from '@angular/router';

import { AdminLoginModule } from './pages/admin-login/admin-login.module';
import { AdminSignupModule } from './pages/admin-signup/admin-signup.module';
import { ListViewModule } from './pages/list/list-view.module';
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
            return ListViewModule;
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
