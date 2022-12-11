import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Exercise, ExerciseType, MuscleGroup, TrainingMachines } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IExerciseService } from 'src/app/interfaces/exercise-service.interface';
import { IInfoService } from 'src/app/interfaces/info-service.interface';
import { ITrainingMachinesService } from 'src/app/interfaces/training-machine-service.interface';

@Component({
    selector: 'app-edit-exercise-modal',
    templateUrl: './edit-exercise-modal.component.html',
    styleUrls: ['./edit-exercise-modal.component.scss'],
})
export class EditExerciseModalComponent implements OnInit {
    editExerciseForm: FormGroup;
    trainingId: string;
    exercise: Exercise;
    exerciseTypes: ExerciseType[] = [];
    selectedExerciseType?: ExerciseType;
    muscleGroups: MuscleGroup[];
    selectedMuscleGroup?: MuscleGroup;
    trainingMachines?: TrainingMachines[];
    selectedTrainingMachine?: TrainingMachines;

    constructor(
        private readonly infoService: IInfoService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly exerciseService: IExerciseService,
        private trainingMachineService: ITrainingMachinesService,
    ) {
        this.exercise = this.config.data;
        this.editExerciseForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            exercise_type: new FormControl(``, [Validators.required]),
            muscle_group: new FormControl(``, [Validators.required]),
            quantity: new FormControl(``, [Validators.required]),
            trainingMachineId: new FormControl(``, [Validators.required]),
            estimatedTime: new FormControl(null, [Validators.required]),
        });
        this.muscleGroups = [
            { name: 'Chest' },
            { name: 'Back' },
            { name: 'Arms' },
            { name: 'Shoulders' },
            { name: 'Legs' },
            { name: 'Calves' },
        ];
        this.trainingId = config.data.trainingId;
    }
    ngOnInit(): void {
        this.exercise = this.config.data;
        this.editExerciseForm.patchValue({
            title: this.exercise.title,
            description: this.exercise.description,
            exercise_type: this.exercise.exercise_type,
            muscle_group: this.exercise.muscle_group,
            quantity: this.exercise.quantity,
            trainingMachineId: this.exercise.trainingMachineId,
            estimatedTime: this.exercise.estimatedTimeInMinutes,
        });
        this.loadTrainingMachines();
        this.loadExerciseTypes();
    }
    async loadExerciseTypes() {
        this.exerciseTypes = await await this.exerciseService.getAllExerciseTypes();
    }

    private async loadTrainingMachines() {
        this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym();
    }

    async onSave() {
        const body = {
            title: this.editExerciseForm.get('title')?.value,
            description: this.editExerciseForm.get('description')?.value,
            exercise_type: this.editExerciseForm.get('exercise_type')?.value.activityId,
            muscle_group: this.editExerciseForm.get('muscle_group')?.value.name,
            quantity: this.editExerciseForm.get('quantity')?.value,
            trainingMachineId: this.editExerciseForm.get('trainingMachineId')?.value.id,
            estimatedTime: this.editExerciseForm.get(' estimatedTime')?.value,
        };
        const response = await this.exerciseService.editExercise(this.exercise.id, body);

        if (!response) {
            this.infoService.error(`Exercise update failed. Try again later`);
            return;
        }
        this.infoService.success(`Exercise has been successfully updated`);
        this.ref.close();
    }

    close(): void {
        this.ref.close();
    }
}
