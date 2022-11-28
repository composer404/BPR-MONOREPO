import { CommonModule } from '@angular/common';
import { ExerciseItemModule } from '../exercise-item/exercise-item.module';
import { ExercisesModalComponent } from './exercises-modal.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, ExerciseItemModule],
    declarations: [ExercisesModalComponent],
    exports: [ExercisesModalComponent],
})
export class ExercisesModalModule {}
