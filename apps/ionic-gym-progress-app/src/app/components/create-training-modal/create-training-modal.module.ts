import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CreateTrainingModalComponent } from './create-training-modal.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
    declarations: [CreateTrainingModalComponent],
    exports: [CreateTrainingModalComponent],
})
export class CreateTrainingModalModule {}
