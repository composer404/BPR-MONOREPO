import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingMachineDetailsPage } from './training-machine-details.page';
import {Routes} from '@angular/router';
import {TrainingMachineItemModule} from '../../components/training-machine-item/training-machine-item.module';

const routes: Routes = [
  {
    path: '',
    component: TrainingMachineDetailsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingMachineItemModule
  ],
  declarations: [TrainingMachineDetailsPage]
})
export class TrainingMachineDetailsPageModule {}
