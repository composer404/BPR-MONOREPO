import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateExerciseModalModule } from '../../modals/create-exercise-modal/create-exercise-modal.module';
import { CreateTrainingModalModule } from 'src/app/modals/create-training-modal/create-training-modal.module';
import { ExerciseItemModule } from '../../modals/exercise-item/exercise-item.module';
import { NgModule } from '@angular/core';
import { TrainingDetailsPage } from './training-details.component';

//import { IonicModule } from '@ionic/angular';



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
        CreateExerciseModalModule,
        ExerciseItemModule,
        CreateTrainingModalModule,
    ],
    declarations: [TrainingDetailsPage],
})
export class TrainingDetailsPageModule {}
