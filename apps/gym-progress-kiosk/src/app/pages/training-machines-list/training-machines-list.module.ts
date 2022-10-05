import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BPRSharedModule } from 'src/app/shared/bpr-shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CreateTrainingMachineModalComponent } from 'src/app/modals/create-training-machine-modal/create-training-machine-modal.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TrainingMachinesListComponent } from './training-machines-list.component';

const routes: Routes = [
    {
        path: '',
        component: TrainingMachinesListComponent,
    },
];

@NgModule({
    declarations: [CreateTrainingMachineModalComponent, TrainingMachinesListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        BPRSharedModule,
        TableModule,
        DialogModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
    ],
    providers: [],
})
export class TrainingMachinesListModule {}