import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CreateExerciseModalComponent } from './create-exercise-modal.component';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  declarations: [CreateExerciseModalComponent],
  exports: [CreateExerciseModalComponent],
})
export class CreateExerciseModalModule {}
