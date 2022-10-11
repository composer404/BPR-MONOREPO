import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ProfilePage } from './profile.page';
import { TrainingItemModule } from 'src/app/components/training-item/training-item.module';

const routes: Routes = [
    {
        path: '',
        component: ProfilePage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, TrainingItemModule],
    declarations: [ProfilePage],
})
export class ProfilePageModule {}
