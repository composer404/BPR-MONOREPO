import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SignupPage } from './signup.page';

const routes: Routes = [
    {
        path: '',
        component: SignupPage,
    },
];
@NgModule({
    declarations: [SignupPage],
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, FormsModule, ReactiveFormsModule],
})
export class SignupModule {}
