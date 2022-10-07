import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateTrainingModalModule } from 'src/app/components/create-training-modal/create-training-modal.module';
import { GymSelectionModule } from 'src/app/components/gym-selection/gym-selection.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TrainingItemModule } from 'src/app/components/training-item/training-item.module';
import { TrainingListPage } from './training-list.page';

const routes: Routes = [
    {
        path: '',
        component: TrainingListPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        GymSelectionModule,
        TrainingItemModule,
        CreateTrainingModalModule,
    ],
    declarations: [TrainingListPage],
})
export class TrainingListPageModule {}
