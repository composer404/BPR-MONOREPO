import { ActiveExerciseModalComponent } from './active.exercise-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [ActiveExerciseModalComponent],
    exports: [ActiveExerciseModalComponent],
})
export class ActiveExerciseModalModule {}
