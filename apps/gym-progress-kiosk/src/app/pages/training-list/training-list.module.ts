import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateTrainingModalModule } from 'src/app/modals/create-training-modal/create-training-modal.module';
import { NgModule } from '@angular/core';
import { TrainingItemModule } from 'src/app/modals/training-item/training-item.module';
import { TrainingListPage } from './training-list.component';

//import { GymSelectionModule } from 'src/app/components/gym-selection/gym-selection.module';




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
        // IonicModule,
        // GymSelectionModule,
        TrainingItemModule,
        CreateTrainingModalModule,
    ],
    declarations: [TrainingListPage],
})
export class TrainingListPageModule {}
