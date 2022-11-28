import { CommonModule } from '@angular/common';
import { ExercisesModalModule } from '../exercies-modal/exercises-modal.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PredefinedTrainingModalComponent } from './predefined-training-modal.component';
import { TrainingItemModule } from '../training-item/training-item.module';

@NgModule({
    imports: [CommonModule, IonicModule, TrainingItemModule],
    declarations: [PredefinedTrainingModalComponent],
    exports: [PredefinedTrainingModalComponent],
})
export class PredefinedTrainingModalModule {}
