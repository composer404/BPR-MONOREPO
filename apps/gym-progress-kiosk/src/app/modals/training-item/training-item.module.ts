import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { TrainingItemComponent } from './training-item.component';

@NgModule({
    imports: [CommonModule, DialogModule],
    declarations: [TrainingItemComponent],
    exports: [TrainingItemComponent],
})
export class TrainingItemModule {}
