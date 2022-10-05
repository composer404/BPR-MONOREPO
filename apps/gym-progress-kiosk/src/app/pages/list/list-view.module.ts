// import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BPRSharedModule } from 'src/app/shared/bpr-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListViewComponent } from './list-view.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TrainingMachinesComponent } from './training-machines/training-machines.component';

const routes: Routes = [
    {
        path: '',
        component: ListViewComponent,
    },
];

@NgModule({
    declarations: [
        ListViewComponent,
         MachineListComponent,
          TrainingMachinesComponent,],
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
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        // DynamicDialogRef,
       // BrowserAnimationsModule,
    ],
    providers: [MessageService, ConfirmationService, DialogService,DynamicDialogRef,DynamicDialogConfig],
})
export class ListViewModule {}
