import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GymItemModule } from '../gym-item/gym-item.module';
import { GymSelectionComponent } from './gym-selection.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, GymItemModule],
    declarations: [GymSelectionComponent],
    exports: [GymSelectionComponent],
})
export class GymSelectionModule {}
