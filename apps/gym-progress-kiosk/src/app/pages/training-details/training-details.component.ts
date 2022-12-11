import { Component, OnInit } from '@angular/core';
import { Exercise, TrainingMachines } from '../../interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CreateExerciseModalComponent } from 'src/app/modals/create-exercise-modal/create-exercise-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditExerciseModalComponent } from 'src/app/modals/edit-exercise-modal/edit-exercise-modal.component';
import { IExerciseService } from 'src/app/interfaces/exercise-service.interface';
import { IInfoService } from 'src/app/interfaces/info-service.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.component.html',
    styleUrls: ['./training-details.component.scss'],
})
export class TrainingDetailsComponent implements OnInit {
    exercises: Exercise[] = [];
    trainingMachines: TrainingMachines[] = [];

    trainingId: string;
    subscriptions: Subscription[] = [];

    constructor(
        private readonly exerciseService: IExerciseService,
        private readonly infoService: IInfoService,
        private readonly dialogService: DialogService,
        private readonly route: ActivatedRoute,
        public config: DynamicDialogConfig,
    ) {
        this.trainingId = this.route.snapshot.params[`trainingId`];
    }

    ngOnInit(): void {
        void this.loadExercises();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    openCreateModal() {
        const ref = this.dialogService.open(CreateExerciseModalComponent, {
            header: `Add new exercise`,
            width: `40%`,
            data: {
                trainingId: this.trainingId,
            },
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.loadExercises();
            }),
        );
    }
    async removeExerciseFromTraining(exercise: Exercise) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            header: `Confirm action`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(async (result) => {
                if (result) {
                    const response = await this.exerciseService.deleteExercise(exercise.id);
                    if (response) {
                        this.infoService.success(`Exercise has been successfully deleted`);
                        this.removeExerciseLocally(exercise.id);
                        return;
                    }
                    this.infoService.success(`Cannot delete exercise. Try again later.`);
                }
            }),
        );
    }
    openEditExerciseModal(exercise: Exercise) {
        const ref = this.dialogService.open(EditExerciseModalComponent, {
            width: `40%`,
            data: {
                ...exercise,
            },
        });
        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.loadExercises();
            }),
        );
    }

    private async loadExercises() {
        const result = await this.exerciseService.getExercisesForTrainings(this.trainingId);
        if (!result) {
            this.infoService.error(`Cannot load created exercises`);
            return;
        }

        this.exercises = result;
    }

    private removeExerciseLocally(exerciseId: string) {
        this.exercises = this.exercises.filter((element) => {
            return element.id !== exerciseId;
        });
    }
}
