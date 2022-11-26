import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise, ModalCloseResult, TrainingMachines } from '../../interfaces/interfaces';

@Component({
    selector: 'app-exercise-item',
    templateUrl: './exercise-item.component.html',
    styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent {
    @Input()
    exercise: Exercise;

    @Input()
    trainingMachines: TrainingMachines[];

    @Input()
    trainingId: string;

    @Output()
    deleteEvent = new EventEmitter<void>();

    @Output()
    editEvent = new EventEmitter<ModalCloseResult>();
}
