import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AdminSignupComponent } from './admin-signup.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
    {
        path: '',
        component: AdminSignupComponent,
    },
];
@NgModule({
    declarations: [AdminSignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ButtonModule,
        CardModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        ToastModule,
    ],
    providers: [MessageService],
})
export class AdminSignupModule {}
