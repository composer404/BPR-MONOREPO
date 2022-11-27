import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MonthlyStatsModule } from 'src/app/components/monthly-stats/monthly-stats.module';
import { NgModule } from '@angular/core';
import { StatisticsPage } from './statistics.page';
import { WeeklyStatsModule } from 'src/app/components/weekly-stats/weekly-stats.module';

const routes: Routes = [
    {
        path: '',
        component: StatisticsPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, WeeklyStatsModule, MonthlyStatsModule],
    declarations: [StatisticsPage],
})
export class StatisticsModule {}
