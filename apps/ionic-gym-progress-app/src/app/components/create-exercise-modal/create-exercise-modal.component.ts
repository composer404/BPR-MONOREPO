/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExerciseService } from '../../services/api/exercise.service';
import { IonModal } from '@ionic/angular';
import { ToastService } from '../../services/common/toast.service';
import { TrainingMachine } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-create-exercise-modal',
    templateUrl: './create-exercise-modal.component.html',
    styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent {
    @ViewChild(IonModal) ionModal: IonModal;

    @Input()
    trainingId: string;

    //! we can pass training machine by input, so that we dont nedd to load it every time we open modal
    @Input()
    trainingMachines: TrainingMachine[];

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

        const result = this.exerciseService.createExercise(this.trainingId, {
            title: this.exerciseForm.get(`title`).value,
            description: this.exerciseForm.get(`description`).value,
            exercise_type: this.exerciseForm.get(`exercise_type`).value,
            muscle_group: this.exerciseForm.get(`muscle_group`).value,
            quantity: this.exerciseForm.get('quantity').value,
        });

        if (!result) {
            this.toastService.error(`Cannot create an exercise. Try again later.`);
            return;
        }
        this.toastService.success(`Successfully created new exercise`);
    }
}
