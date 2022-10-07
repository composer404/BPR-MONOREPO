import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GymItemComponent } from './gym-item.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule],
    declarations: [GymItemComponent],
    exports: [GymItemComponent],
})
export class GymItemModule {}
