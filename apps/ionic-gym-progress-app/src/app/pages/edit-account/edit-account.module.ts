import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EditAccountPage } from './edit-accout.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: EditAccountPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, ReactiveFormsModule],
    declarations: [EditAccountPage],
})
export class EditPageModule {}
