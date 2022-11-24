import { ActiveExerciseModalModule } from '../active-exercise-modal/active-exercise-modal.module';
import { ActiveTrainingExerciseComponent } from './active-training-exercise.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, ActiveExerciseModalModule],
    declarations: [ActiveTrainingExerciseComponent],
    exports: [ActiveTrainingExerciseComponent],
})
export class ActiveTrainingExerciseModule {}
