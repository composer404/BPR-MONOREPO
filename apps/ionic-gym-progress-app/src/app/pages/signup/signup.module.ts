import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { IonicModule } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SignupPage } from './signup.page';
import { SignupPageRoutingModule } from './signup-routing.module';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
    {
        path: '',
        component: SignupPage,
    },
];
@NgModule({
    declarations: [SignupPage],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ButtonModule,
        IonicModule,
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
        SignupPageRoutingModule,
        PasswordModule,
        FileUploadModule,
    ],
    providers: [MessageService],
})
export class SignupModule {}
