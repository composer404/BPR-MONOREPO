import { Dialog, DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CreateTrainingModalComponent } from './create-training-modal.component';
import { NgModule } from '@angular/core';

//import { IonicModule } from '@ionic/angular';


@NgModule({
    imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
    declarations: [CreateTrainingModalComponent],
    exports: [CreateTrainingModalComponent],
})
export class CreateTrainingModalModule {}
