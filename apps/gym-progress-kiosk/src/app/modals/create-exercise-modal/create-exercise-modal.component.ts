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
//    //@ViewChild(IonModal) ionModal: IonModal;

    @Input()
  trainingId?: string;

//     @Input()
//     buttonTemplate: TemplateRef<any>;

    @Input()
     exercise?: Exercise;

    @Input()
     trainingMachines?: TrainingMachines[];

    @Input()
     id?: string;

    @Output()
     closeEvent = new EventEmitter<ModalCloseResult>();

    exerciseForm: FormGroup;
    exerciseTypes?: ExerciseType[];
    selected?: string;
      title?: string;
    description?: string;

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

    loadExerciseData() {
        this.exerciseForm = new FormGroup({
            title: new FormControl(this.exercise?.title, [Validators.required]),
            description: new FormControl(this.exercise?.description),
            exercise_type: new FormControl(this.exercise?.exercise_type),
            muscle_group: new FormControl(this.exercise?.muscle_group),
            quantity: new FormControl(this.exercise?.quantity),
            trainingMachineId: new FormControl(this.exercise?.trainingMachineId, [Validators.required]),
            estimatedTime: new FormControl(this.exercise?.estimatedTimeInMinutes, [Validators.required]),
        });
    }

    async loadExerciseTypes() {
        this.exerciseTypes = await this.exerciseService.getAllExerciseTypes();
    }

    async confirmExerciseForm() {
        const requestBody = {
            title: this.exerciseForm.get(`title`)?.value,
            description: this.exerciseForm.get(`description`)?.value,
            exercise_type: this.exerciseForm.get(`exercise_type`)?.value,
            muscle_group: this.exerciseForm.get(`muscle_group`)?.value,
            quantity: this.exerciseForm.get('quantity')?.value,
            trainingMachineId: this.exerciseForm.get(`trainingMachineId`)?.value,
            estimatedTimeInMinutes: this.exerciseForm.get(`estimatedTime`)?.value,
        };

        if (this.exercise) {
            const editResult = await this.editExercise(requestBody);
            this.ref.close(editResult);
            return;
        }

        const createResult = await this.createExercise(requestBody);
        this.ref.close(createResult);
    }


    async editExercise(body: Partial<Exercise>) {
        const result = await this.exerciseService.editExercise(this.exercise.id, body);

        if (!result) {
            this.infoService.error(`Cannot edit exercise. Try again later.`);
            return;
        }
        this.infoService.success(`Successfully edited exercise`);
        return this.exercise?.id;
    }


    timeSliderFormater(value: number) {
        return `${value}min`;
    }

    closeModalWithConfirm(exerciseId?: string) {
        this.ref.close('confirm');
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
   // async createExercise():Promise<void>{

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
