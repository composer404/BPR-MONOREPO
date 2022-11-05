import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Gym } from 'src/app/interfaces/interfaces';

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

    constructor() {}

    ngOnInit() {}
}
