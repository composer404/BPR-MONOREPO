import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Exercise } from '../../interfaces/interfaces';

@Component({
    selector: 'app-exercise-item',
    templateUrl: './exercise-item.component.html',
    styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent implements OnChanges {
    @Input()
    exercise: Exercise;

    @Input()
    incommingValue: any;

    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }
}
