import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ProfilePage } from './profile.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ProfilePage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, IonicModule, ReactiveFormsModule],
    declarations: [ProfilePage],
})
export class ProfilePageModule {}
