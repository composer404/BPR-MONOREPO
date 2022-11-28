import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TrainingSessionItemComponent } from './training-session-item.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [TrainingSessionItemComponent],
    exports: [TrainingSessionItemComponent],
})
export class TrainingSessionItemModule {}
