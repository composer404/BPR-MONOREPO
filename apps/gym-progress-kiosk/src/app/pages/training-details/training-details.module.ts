import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationModalModule } from 'src/app/shared/confirmation-modal/confirmation-modal.module';
import { ConfirmationService } from 'primeng/api';
import { CreateExerciseModalComponent } from 'src/app/modals/create-exercise-modal/create-exercise-modal.component';
import { CreateTrainingModalComponent } from 'src/app/modals/create-training-modal/create-training-modal.component';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { EditExerciseModalComponent } from 'src/app/modals/edit-exercise-modal/edit-exercise-modal.component';
import { EditTrainingModalComponent } from 'src/app/modals/edit-training-modal/edit-training-modal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TrainingDetailsComponent } from './training-details.component';

const routes: Routes = [
    {
        path: '',
        component: TrainingDetailsComponent,
    },
];

@NgModule({
    declarations: [
        CreateExerciseModalComponent,
        TrainingDetailsComponent,
        EditExerciseModalComponent,
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
        ConfirmationModalModule,
        DropdownModule,
    ],
    providers: [ConfirmDialogModule, ConfirmationService],
})
export class TrainingDetailsModule {}
