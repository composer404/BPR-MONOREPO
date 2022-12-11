/* eslint-disable @typescript-eslint/naming-convention */

import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Exercise, ExerciseType, ModalCloseResult, TrainingMachine } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IExerciseService } from 'src/app/interfaces/exercise-service.interface';
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
    exerciseTypes: ExerciseType[];
    selected: string;
    title: string;
    description: string;

    constructor(private readonly exerciseService: IExerciseService, private readonly toastService: ToastService) {
        this.exerciseForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            exercise_type: new FormControl(``, [Validators.required]),
            muscle_group: new FormControl(``, [Validators.required]),
            quantity: new FormControl(``, [Validators.required]),
            trainingMachineId: new FormControl(``, [Validators.required]),
            estimatedTime: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit(): void {
        void this.loadExerciseTypes();
        if (this.exercise) {
            this.title = `EDIT AN EXERCISE`;
            this.loadExerciseData();
            return;
        }
        this.title = `CREATE AN EXERCISE`;
    }

    loadExerciseData() {
        this.exerciseForm = new FormGroup({
            title: new FormControl(this.exercise.title, [Validators.required]),
            description: new FormControl(this.exercise.description),
            exercise_type: new FormControl(this.exercise.exercise_type, [Validators.required]),
            muscle_group: new FormControl(this.exercise.muscle_group, [Validators.required]),
            quantity: new FormControl(this.exercise.quantity, [Validators.required]),
            trainingMachineId: new FormControl(this.exercise.trainingMachineId, [Validators.required]),
            estimatedTime: new FormControl(this.exercise.estimatedTimeInMinutes, [Validators.required]),
        });
    }

    async loadExerciseTypes() {
        this.exerciseTypes = await this.exerciseService.getAllExerciseTypes();
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
        this.toastService.success(`Exercise has been successfully created`);
        return result.id;
    }

    async editExercise(body: Partial<Exercise>) {
        const result = await this.exerciseService.editExercise(this.exercise.id, body);

        if (!result) {
            this.toastService.error(`Cannot edit exercise. Try again later.`);
            return;
        }
        this.toastService.success(`Exercise has been successfully updated`);
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

    onExerciseTypeChange(event: any) {
        const activityId = event?.detail?.value;

        if (activityId) {
            this.exerciseForm.patchValue({
                exercise_type: activityId,
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
            activity: this.exerciseForm.get(`activity`).value,
        });

        if (!result) {
            this.toastService.error(`Cannot create an exercise. Try again later.`);
            return;
        }
        this.toastService.success(`Exercise has been successfully created`);
    }
}
