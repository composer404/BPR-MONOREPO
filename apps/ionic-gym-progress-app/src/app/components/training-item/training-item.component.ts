import { Component, Input } from '@angular/core';

import { Training } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-training-item',
    templateUrl: './training-item.component.html',
    styleUrls: ['./training-item.component.scss'],
})
export class TrainingItemComponent {
    @Input()
    training: Training;
}
