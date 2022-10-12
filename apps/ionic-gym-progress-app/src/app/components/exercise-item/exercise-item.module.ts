import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {ExerciseItemComponent} from './exercise-item.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ExerciseItemComponent],
  exports: [ExerciseItemComponent],
})
export class ExerciseItemModule {}
