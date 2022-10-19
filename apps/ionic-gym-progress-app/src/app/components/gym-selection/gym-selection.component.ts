import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Gym } from 'src/app/interfaces/interfaces';
import { GymService } from 'src/app/services/api/gym.service';
import { ToastService } from 'src/app/services/common/toast.service';

@Component({
    selector: 'app-gym-selection',
    templateUrl: './gym-selection.component.html',
    styleUrls: ['./gym-selection.component.scss'],
})
export class GymSelectionComponent {
    @Input()
    disabled: boolean;

    @Output()
    gymSelected = new EventEmitter<Gym>();

    insertedName = ``;
    gyms: Gym[] = [];

    constructor(private readonly gymService: GymService, private readonly toastService: ToastService) {}

    async searchForGym() {
        if (this.insertedName.length < 3) {
            this.gyms = [];
            return;
        }
        const response = await this.gymService.getGymsByName(this.insertedName);

        if (!response) {
            this.toastService.error(`Cannot load gyms. Try again later.`);
            return;
        }
        this.gyms = response;
    }
}
