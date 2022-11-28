import { CommonModule } from '@angular/common';
import { ExercisesModalModule } from '../exercies-modal/exercises-modal.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TrainingItemComponent } from './training-item.component';

@NgModule({
    imports: [CommonModule, IonicModule, ExercisesModalModule],
    declarations: [TrainingItemComponent],
    exports: [TrainingItemComponent],
})
export class TrainingItemModule {}
