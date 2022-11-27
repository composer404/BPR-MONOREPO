import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MonthlyStatsComponent } from './monthly-stats.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [MonthlyStatsComponent],
    exports: [MonthlyStatsComponent],
})
export class MonthlyStatsModule {}
