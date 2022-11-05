import { Component, Input, OnChanges } from '@angular/core';
import { Exercise, ExerciseStatusChange } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-active-training-exercise',
    templateUrl: './active-training-exercise.component.html',
    styleUrls: ['./active-training-exercise.component.scss'],
})
export class ActiveTrainingExerciseComponent implements OnChanges {
    @Input()
    exercise: Exercise;

    @Input()
    statusChange: ExerciseStatusChange;

    ngOnChanges() {
        console.log(`innconmming value`, this.statusChange);
    }
}
