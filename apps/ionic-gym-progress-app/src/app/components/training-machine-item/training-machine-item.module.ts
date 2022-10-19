import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {TrainingMachineItemComponent} from './training-machine-item.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [TrainingMachineItemComponent],
  exports: [TrainingMachineItemComponent],
})
export class TrainingMachineItemModule {}
