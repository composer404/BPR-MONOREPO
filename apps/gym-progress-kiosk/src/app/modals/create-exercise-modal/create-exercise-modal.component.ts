/* eslint-disable @typescript-eslint/naming-convention */

import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Exercise, ExerciseType, ModalCloseResult, TrainingMachines } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExerciseService } from 'src/app/services/exercise.service';
import { InfoService } from 'src/app/services/info.service';

//import { ToastService } from '../../services/common/toast.service';
// @Inject
// trainingId: string;

@Component({
    selector: 'app-create-exercise-modal',
    templateUrl: './create-exercise-modal.component.html',
    styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent implements OnInit {

  trainingId?: string;
 exerciseForm: FormGroup;
   

    constructor(private readonly exerciseService: ExerciseService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly infoService: InfoService,
        ) {
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

    ngOnInit(): void {}

   

    async loadExerciseTypes() {
        this.exerciseTypes = await this.exerciseService.getAllExerciseTypes();
    }

    timeSliderFormatter(value: number) {
        return `${value}min`;
    }

    
    async createExercise():Promise<void>{

        const response = this.exerciseService.createExercise(this.trainingId, {
            title: this.exerciseForm?.get(`title`)?.value ,
            description: this.exerciseForm?.get(`description`)?.value,
            exercise_type: this.exerciseForm?.get(`exercise_type`)?.value,
            muscle_group: this.exerciseForm?.get(`muscle_group`)?.value,
            quantity: this.exerciseForm?.get('quantity')?.value,
            trainingMachineId: this.exerciseForm?.get(`trainingMachineId`)?.value,
            estimatedTimeInMinutes: this.exerciseForm?.get(`estimatedTime`)?.value,
            activity: this.exerciseForm?.get(`activity`)?.value,
        });
        if (!response) {
            this.infoService.error(`Cannot create an exercise. Try again later.`);
            return;
        }
        this.infoService.success(`Successfully created new exercise`);
  }
    
}
