import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GymItemModule } from '../gym-item/gym-item.module';
import { GymSelectionComponent } from './gym-selection.component';
import { GymService } from 'src/app/services/api/gym.service';
import { IGymService } from '../../interfaces/gym-service.interface';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, GymItemModule],
    declarations: [GymSelectionComponent],
    providers: [{
        provide: IGymService, useClass: GymService,
    }],
    exports: [GymSelectionComponent],
})
export class GymSelectionModule {}
