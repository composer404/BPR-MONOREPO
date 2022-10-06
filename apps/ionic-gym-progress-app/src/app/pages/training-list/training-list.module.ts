import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingListPage } from './training-list.page';

const routes: Routes = [
    {
        path: '',
        component: TrainingListPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, ReactiveFormsModule],
    declarations: [TrainingListPage],
})
export class TrainingListPageModule {}
