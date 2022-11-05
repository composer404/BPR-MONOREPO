import { RouterModule, Routes } from '@angular/router';

import { ActiveTrainingExerciseModule } from 'src/app/components/active-training-exercise/active-training-exercise.module';
import { ActiveTrainingPage } from './active-training.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: ActiveTrainingPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, ActiveTrainingExerciseModule],
    declarations: [ActiveTrainingPage],
})
export class ActiveTrainingPageModule {}
