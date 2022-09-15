import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: LoginPage,
    },
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), ReactiveFormsModule],
    declarations: [LoginPage],
})
export class LoginPageModule {}
