import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';


import {RouterModule, Routes} from '@angular/router';
import {CreateExerciseModalModule} from '../../components/create-exercise-modal/create-exercise-modal.module';
import {TrainingDetailsPage} from './training-details.page';
import {ExerciseItemModule} from '../../components/exercise-item/exercise-item.module';
import {TrainingItemModule} from '../../components/training-item/training-item.module';

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
    TrainingItemModule,
  ],
  declarations: [TrainingDetailsPage]
})
export class TrainingDetailsPageModule {}
