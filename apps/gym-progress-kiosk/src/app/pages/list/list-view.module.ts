import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BPRSharedModule } from 'src/app/shared/bpr-shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ListViewComponent} from './list-view.component'
import { MachineListComponent } from './machine-list/machine-list.component';
import { MessageService } from 'primeng/api';
import { NgModule }      from '@angular/core';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import{ TrainingMachinesComponent } from './training-machines/training-machines.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
        {
            path: '',
            component: ListViewComponent,
        },
    ];

@NgModule({
    declarations: [ListViewComponent, MachineListComponent, TrainingMachinesComponent],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    CardModule,
    BPRSharedModule,
    TableModule,
    CommonModule,
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
  ],
  providers: [ MessageService, ConfirmationService]
})

export class ListViewModule { }
