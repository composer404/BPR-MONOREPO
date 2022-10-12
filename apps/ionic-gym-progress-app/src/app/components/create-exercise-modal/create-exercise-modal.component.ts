import {Component, Input, ViewChild} from '@angular/core';
import {IonModal} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../services/common/toast.service';
import {ExerciseService} from '../../services/api/exercise.service';

@Component({
  selector: 'app-create-exercise-modal',
  templateUrl: './create-exercise-modal.component.html',
  styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent {

  @ViewChild(IonModal) ionModal: IonModal;

  @Input()
  trainingId: string;

  exerciseForm: FormGroup;
  selected: string;
  description: string;

  constructor(private readonly exerciseService: ExerciseService, private readonly toastService: ToastService) {
    this.exerciseForm = new FormGroup({
      title: new FormControl(``, [Validators.required]),
      description: new FormControl(``),
      exercise_type: new FormControl(``),
      muscle_group: new FormControl(``),
      quantity: new FormControl(``),
    });
  }

  cancelExerciseCreation() {
    this.ionModal.dismiss(null, 'cancel');
  }

  createExercise() {
    this.ionModal.dismiss(null, 'confirm');
  }

  onWillDismissModal(event: any) {
    if (event.detail.role !== `confirm`) {
      return;
    }

    const result = this.exerciseService.createExercise({
      title: this.exerciseForm.get(`title`).value,
      description: this.exerciseForm.get(`description`).value,
      exercise_type: this.exerciseForm.get(`exercise_type`).value,
      muscle_group: this.exerciseForm.get(`muscle_group`).value,
      quantity: this.exerciseForm.get('quantity').value,
      trainingId: this.trainingId,
    });

    if (!result) {
      this.toastService.error(`Cannot create an exercise. Try again later.`);
      return;
    }
    this.toastService.success(`Successfully created new exercise`);
  }

}
