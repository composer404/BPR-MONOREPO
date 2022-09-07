import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];
@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        IonicModule,
    ],
    providers: [],
})
export class LoginModule {}
