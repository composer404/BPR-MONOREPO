import { RouterModule, Routes } from '@angular/router';

import { AdminSignupComponent } from './admin-signup.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: ``,
        component: AdminSignupComponent,
    },
];

@NgModule({
    declarations: [AdminSignupComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminSignupModule {}
