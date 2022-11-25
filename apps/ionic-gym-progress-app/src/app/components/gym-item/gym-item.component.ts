import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Gym } from 'src/app/interfaces/interfaces';
import { GymService } from 'src/app/services/api/gym.service';
import { SessionsService } from 'src/app/services/api/sessions.service';

@Component({
    selector: 'app-gym-item',
    templateUrl: './gym-item.component.html',
    styleUrls: ['./gym-item.component.scss'],
})
export class GymItemComponent implements OnInit {
    @Input()
    gym: Gym;

    @Output()
    gymSelected = new EventEmitter<Gym>();

    participantsNumber: number;

    constructor(private readonly sessionService: SessionsService) {}

    ngOnInit() {
        this.sessionService.getGymNumberOfParticipants(this.gym.id).then((data) => {
            this.participantsNumber = data;
        });
    }
}
