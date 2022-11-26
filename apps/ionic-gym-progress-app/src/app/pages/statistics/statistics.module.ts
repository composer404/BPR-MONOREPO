import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StatisticsPage } from './statistics.page';

const routes: Routes = [
    {
        path: '',
        component: StatisticsPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule],
    declarations: [StatisticsPage],
})
export class StatisticsModule {}
