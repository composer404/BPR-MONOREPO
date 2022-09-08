import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';

const routes: Routes = [
    {
        path: '',
        component: SignupComponent,
    },
];
@NgModule({
    declarations: [SignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        IonicModule,
    ],
    providers: [],
})
export class SignupModule {}
