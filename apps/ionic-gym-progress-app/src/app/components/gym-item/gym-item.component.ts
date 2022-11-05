import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gym, WEBSOCKET_EVENTS } from 'src/app/interfaces/interfaces';

import { WebsocketService } from 'src/app/services/api/websocket.service';

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

    constructor(private readonly websocketService: WebsocketService) {}

    ngOnInit() {
        // this.websocketService.sendMessage(WEBSOCKET_EVENTS.connect_to_gym, this.gym.id);
    }
}
