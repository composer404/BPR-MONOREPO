import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CreateExerciseModalComponent } from './create-exercise-modal.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  declarations: [CreateExerciseModalComponent],
  exports: [CreateExerciseModalComponent],
})
export class CreateExerciseModalModule {}
