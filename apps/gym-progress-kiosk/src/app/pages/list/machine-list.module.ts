// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';

// import { ButtonModule } from 'primeng/button';
// import { CardModule } from 'primeng/card';
// import { CommonModule } from '@angular/common';
// import { InputTextModule } from 'primeng/inputtext';
// import { MessageService } from 'primeng/api';
// import { NgModule } from '@angular/core';
// import { PasswordModule } from 'primeng/password';
// import { ToastModule } from 'primeng/toast';
// import { TrainingMachinesComponent } from './training-machines.component';

// const routes: Routes = [
//     {
//         path: '',
//         component: TrainingMachinesComponent,
//     },
// ];
// @NgModule({
//     declarations: [TrainingMachinesComponent],
//     imports: [
//         CommonModule,
//         RouterModule.forChild(routes),
//         ButtonModule,
//         CardModule,
//         InputTextModule,
//         FormsModule,
//         ReactiveFormsModule,
//         PasswordModule,
//         ToastModule,
//     ],
//     providers: [MessageService],
// })
// export class TrainingMachinesModule {}

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MachineListComponent } from './machine-list.component';
import { MessageService } from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';
import { NgModule }      from '@angular/core';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {SliderModule} from 'primeng/slider';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import{ TrainingMachinesComponent } from './training-machines/training-machines.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
        {
            path: '',
            component: MachineListComponent,
        },
    ];

@NgModule({
    declarations: [MachineListComponent,TrainingMachinesComponent],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    TableModule,
    CalendarModule,
    CommonModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
  ],
  providers: [ MessageService, ConfirmationService]
})

export class MachineListModule { }
