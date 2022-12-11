import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Gym } from 'src/app/interfaces/interfaces';
import { ISessionsService } from 'src/app/interfaces/sessions-service.interface';

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

    constructor(private readonly sessionService: ISessionsService) {}

    ngOnInit() {
        this.sessionService.getGymNumberOfParticipants(this.gym.id).then((data) => {
            this.participantsNumber = data;
        });
    }
}
