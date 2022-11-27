import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { WeeklyStatsComponent } from './weekly-stats.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [WeeklyStatsComponent],
    exports: [WeeklyStatsComponent],
})
export class WeeklyStatsModule {}
