/* eslint-disable @typescript-eslint/naming-convention */

import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    Exercise,
    ExerciseType,
    ModalCloseResult,
    MuscleGroup,
    Training,
    TrainingMachines,
} from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExerciseService } from 'src/app/services/exercise.service';
import { InfoService } from 'src/app/services/info.service';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
    selector: 'app-create-exercise-modal',
    templateUrl: './create-exercise-modal.component.html',
    styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent implements OnInit {
    trainingId: string;
    exerciseForm: FormGroup;

    exerciseTypes: ExerciseType[] = [];
    selectedExerciseType?: ExerciseType;

    muscleGroups: MuscleGroup[];
    selectedMuscleGroup?: MuscleGroup;

    trainingMachines?: TrainingMachines[];
    selectedTrainingMachine?: TrainingMachines;

    exercise?: Exercise[];

    constructor(
        private readonly exerciseService: ExerciseService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly infoService: InfoService,
        private trainingMachineService: TrainingMachinesService,
        private trainingService: TrainingService,
    ) {
        this.exerciseForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            exercise_type: new FormControl(``, [Validators.required]),
            muscle_group: new FormControl(``,[Validators.required]),
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

        console.log(config.data);
        this.trainingId = config.data.trainingId;
    }

    ngOnInit(): void {
        this.loadTrainingMachines();
        this.loadExerciseTypes();
    }

    async loadExerciseTypes() {
        this.exerciseTypes = await await this.exerciseService.getAllExerciseTypes();
    }

    private async loadTrainingMachines() {
        this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym();
    }

    async createExercise(): Promise<void> {
        const response = await this.exerciseService.createExercise(this.trainingId, {
            title: this.exerciseForm?.get(`title`)?.value,
            description: this.exerciseForm?.get(`description`)?.value,
            exercise_type: this.exerciseForm?.get(`exercise_type`)?.value.activityId,
            muscle_group: this.exerciseForm?.get(`muscle_group`)?.value.name,
            quantity: this.exerciseForm?.get('quantity')?.value,
            trainingMachineId: this.exerciseForm?.get(`trainingMachineId`)?.value.id,
            estimatedTimeInMinutes: this.exerciseForm?.get(`estimatedTime`)?.value,
            activity: this.exerciseForm?.get(`activity`)?.value,
        });

        if (!response) {
            this.infoService.error(`Exercise creation failed. Try again later`);
            return;
        }
        this.infoService.success(`Exercise has been successfully created`);
        this.ref.close();
    }

    close(): void {
        this.ref.close(null);
    }
}
