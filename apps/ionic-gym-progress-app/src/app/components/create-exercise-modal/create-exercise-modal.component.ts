/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Exercise, ModalCloseResult, TrainingMachine } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExerciseService } from '../../services/api/exercise.service';
import { IonModal } from '@ionic/angular';
import { ToastService } from '../../services/common/toast.service';

@Component({
    selector: 'app-create-exercise-modal',
    templateUrl: './create-exercise-modal.component.html',
    styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent implements OnInit {
    @ViewChild(IonModal) ionModal: IonModal;

    @Input()
    trainingId: string;

    @Input()
    buttonTemplate: TemplateRef<any>;

    @Input()
    exercise: Exercise;

    @Input()
    trainingMachines: TrainingMachine[];

    @Input()
    id: string;

    @Output()
    closeEvent = new EventEmitter<ModalCloseResult>();

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
            trainingMachineId: new FormControl(``, [Validators.required]),
            estimatedTime: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit(): void {
        if (this.exercise) {
            this.loadExerciseData();
        }
    }

    loadExerciseData() {
        this.exerciseForm = new FormGroup({
            title: new FormControl(this.exercise.title, [Validators.required]),
            description: new FormControl(this.exercise.description),
            exercise_type: new FormControl(this.exercise.exercise_type),
            muscle_group: new FormControl(this.exercise.muscle_group),
            quantity: new FormControl(this.exercise.quantity),
            trainingMachineId: new FormControl(this.exercise.trainingMachineId, [Validators.required]),
            estimatedTime: new FormControl(this.exercise.estimatedTimeInMinutes, [Validators.required]),
        });
    }

    async confirmExerciseForm() {
        const requestBody = {
            title: this.exerciseForm.get(`title`).value,
            description: this.exerciseForm.get(`description`).value,
            exercise_type: this.exerciseForm.get(`exercise_type`).value,
            muscle_group: this.exerciseForm.get(`muscle_group`).value,
            quantity: this.exerciseForm.get('quantity').value,
            trainingMachineId: this.exerciseForm.get(`trainingMachineId`).value,
            estimatedTimeInMinutes: this.exerciseForm.get(`estimatedTime`).value,
        };

        if (this.exercise) {
            const editResult = await this.editExercise(requestBody);
            this.closeModalWithConfirm(editResult);
            return;
        }

        const createResult = await this.createExercise(requestBody);
        this.closeModalWithConfirm(createResult);
    }

    async createExercise(body: Partial<Exercise>): Promise<string> {
        const result = await this.exerciseService.createExercise(this.trainingId, body);

        if (!result) {
            this.toastService.error(`Cannot create an exercise. Try again later.`);
            return;
        }
        this.toastService.success(`Successfully created new exercise`);
        return result.id;
    }

    async editExercise(body: Partial<Exercise>) {
        const result = await this.exerciseService.editExercise(this.exercise.id, body);

        if (!result) {
            this.toastService.error(`Cannot edit exercise. Try again later.`);
            return;
        }
        this.toastService.success(`Successfully edited exercise`);
        return this.exercise.id;
    }

    cancelExerciseCreation() {
        this.ionModal.dismiss(null, 'cancel');
        this.closeEvent.emit({
            type: `Close`,
        });
    }

    timeSliderFormater(value: number) {
        return `${value}min`;
    }

    closeModalWithConfirm(exerciseId?: string) {
        this.ionModal.dismiss(null, 'confirm');
        this.closeEvent.emit({
            type: `Confirm`,
            data: {
                exerciseId,
            },
        });
    }

    onTrainingMachineChange(event: any) {
        const trainingMachineId = event?.detail?.value;

        if (trainingMachineId) {
            this.exerciseForm.patchValue({
                trainingMachineId,
            });
        }
    }

    onEstimatedTimeChange(event: any) {
        const estimatedTime = event?.detail?.value;

        if (estimatedTime) {
            this.exerciseForm.patchValue({
                estimatedTime,
            });
        }
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
            trainingMachineId: this.exerciseForm.get(`trainingMachineId`).value,
            estimatedTimeInMinutes: this.exerciseForm.get(`estimatedTime`).value,
        });

        if (!result) {
            this.toastService.error(`Cannot create an exercise. Try again later.`);
            return;
        }
        this.toastService.success(`Successfully created new exercise`);
    }
}
