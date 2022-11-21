import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StartTrainingPage } from './start-training.page';
import { TrainingItemModule } from 'src/app/components/training-item/training-item.module';

const routes: Routes = [
    {
        path: '',
        component: StartTrainingPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, TrainingItemModule],
    declarations: [StartTrainingPage],
})
export class StartTrainingPageModule {}
