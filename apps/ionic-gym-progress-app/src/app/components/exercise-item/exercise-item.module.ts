import { CommonModule } from '@angular/common';
import { CreateExerciseModalModule } from '../create-exercise-modal/create-exercise-modal.module';
import { ExerciseItemComponent } from './exercise-item.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, CreateExerciseModalModule],
    declarations: [ExerciseItemComponent],
    exports: [ExerciseItemComponent],
})
export class ExerciseItemModule {}
