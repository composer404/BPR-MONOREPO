import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AdminSignupComponent } from './admin-signup.component';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import {SplitterModule} from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
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
        RippleModule,
        CardModule,
        DividerModule,
        InputTextModule,
        AvatarModule,
        AvatarGroupModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        StepsModule,
        PasswordModule,
        FileUploadModule,
        SplitterModule,
    ],
    providers: [MessageService],
})
export class AdminSignupModule {}

