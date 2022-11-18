import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateExerciseModalModule } from '../../components/create-exercise-modal/create-exercise-modal.module';
import { CreateTrainingModalModule } from 'src/app/components/create-training-modal/create-training-modal.module';
import { ExerciseItemModule } from '../../components/exercise-item/exercise-item.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TrainingDetailsPage } from './training-details.page';

const routes: Routes = [
    {
        path: '',
        component: TrainingDetailsPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        CreateExerciseModalModule,
        ExerciseItemModule,
        CreateTrainingModalModule,
    ],
    declarations: [TrainingDetailsPage],
})
export class TrainingDetailsPageModule {}
