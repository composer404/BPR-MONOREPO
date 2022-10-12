import {Component, Input} from '@angular/core';
import {Exercise} from '../../interfaces/interfaces';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent {
  @Input()
  exercise: Exercise;
}
