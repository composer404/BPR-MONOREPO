import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationModalModule } from 'src/app/shared/confirmation-modal/confirmation-modal.module';
import { ConfirmationService } from 'primeng/api';
import { CreateTrainingMachineModalComponent } from 'src/app/modals/create-training-machine-modal/create-training-machine-modal.component';
import { DialogModule } from 'primeng/dialog';
import { EditTrainingMachineModalComponent } from 'src/app/modals/edit-training-machine-modal/edit-training-machine-modal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TrainingMachinesListComponent } from './training-machines-list.component';

const routes: Routes = [
    {
        path: '',
        component: TrainingMachinesListComponent,
    },
];

@NgModule({
    declarations: [
        CreateTrainingMachineModalComponent,
        TrainingMachinesListComponent,
        EditTrainingMachineModalComponent,
       //ConfirmationModalComponent,
    ],
    imports: [
        CommonModule,
        ToolbarModule,
        RouterModule.forChild(routes),
        CardModule,
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
        QRCodeModule,
        ConfirmationModalModule,
    ],
    providers: [ConfirmDialogModule, ConfirmationService],
})
export class TrainingMachinesListModule {}
