import { RouterModule, Routes } from '@angular/router';

import { AdminLoginComponent } from './admin-login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: ``,
        component: AdminLoginComponent,
    },
];

@NgModule({
    declarations: [AdminLoginComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminLoginModule {}
