import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TrainingItemComponent } from './training-item.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [TrainingItemComponent],
    exports: [TrainingItemComponent],
})
export class TrainingItemModule {}
