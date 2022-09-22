import { RouterModule, Routes } from '@angular/router';

import { AdminLoginComponent } from './admin-login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {PasswordModule} from "primeng/password";
import {MessageService} from "primeng/api";

const routes: Routes = [
    {
        path: ``,
        component: AdminLoginComponent,
    },
];

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    RippleModule,
    CardModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule,
  ],
  providers: [MessageService],
})
export class AdminLoginModule {}
