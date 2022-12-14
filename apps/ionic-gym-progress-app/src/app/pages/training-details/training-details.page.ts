import { ActivatedRoute, Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Exercise, ModalCloseResult, Training, TrainingMachine } from '../../interfaces/interfaces';

import { DialogService } from 'src/app/services/common/dialog.service';
import { IExerciseService } from 'src/app/interfaces/exercise-service.interface';
import { ITrainingMachineService } from 'src/app/interfaces/training-machine-service.interface';
import { ITrainingsService } from 'src/app/interfaces/trainings-service.interface';
import { ToastService } from 'src/app/services/common/toast.service';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.page.html',
    styleUrls: ['./training-details.page.scss'],
})
export class TrainingDetailsPage implements OnInit {
    exercises: Exercise[] = [];
    trainingMachines: TrainingMachine[] = [];

    selectedTraining: Training;
    profileId: string;
    trainingId: string;
    gymId: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private readonly exerciseService: IExerciseService,
        private readonly trainingService: ITrainingsService,
        private readonly trainingMachinesService: ITrainingMachineService,
        private readonly toastService: ToastService,
        private readonly dialogService: DialogService,
    ) {
        this.profileId = this.route.snapshot.params.id;
        this.trainingId = this.route.snapshot.params.trainingId;
        this.gymId = this.route.snapshot.params.gymId;
    }

    ngOnInit(): void {
        this.loadTrainingData();
        this.loadExercises();
        this.loadTrainingMachines();
    }

    async loadTrainingData(): Promise<void> {
        const result = await this.trainingService.getTrainingById(this.trainingId);
        if (!result) {
            this.toastService.error(`Cannot load selected training. Try again later.`);
            return;
        }

        this.selectedTraining = result;
    }

    loadExercises(): void {
        this.exerciseService.getExercisesForTrainings(this.trainingId).then((result) => {
            if (!result) {
                this.toastService.error(`Cannot load exercises. Try again later.`);
                return;
            }
            if (result) {
                this.exercises = result;
            }
        });
    }

    async onExerciseDelete(exerciseId: string) {
        await this.dialogService.openConfirmationDialog({
            header: `Are you sure?`,

            confirmFn: async () => {
                const result = await this.exerciseService.deleteExercise(exerciseId);
                if (!result) {
                    this.toastService.error(`Cannot delete selected exercise. Try again later.`);
                    return;
                }
                this.toastService.success(`Selected exercise has been successfully deleted`);
                this.exercises = this.exercises.filter((exercise) => exercise.id !== exerciseId);
            },
        });
    }

    async deleteTraining(): Promise<void> {
        await this.dialogService.openConfirmationDialog({
            header: `Are you sure?`,

            confirmFn: async () => {
                const result = await this.trainingService.deleteTraining(this.trainingId);
                if (!result) {
                    this.toastService.error(`Cannot delete selected training. Try again later.`);
                    return;
                }
                this.toastService.success(`Selected training has been successfully deleted`);
                this.router.navigateByUrl(`/profile-tabs/profile/${this.profileId}/training-list`);
            },
        });
    }

    async onExerciseCreated(event: ModalCloseResult) {
        if (event.type === `Confirm`) {
            const exercise = await this.exerciseService.getExerciseById(event.data.exerciseId);
            this.exercises.push(exercise);
        }
    }

    async onExerciseEdited(event: ModalCloseResult) {
        if (event.type === `Confirm`) {
            const exercise = await this.exerciseService.getExerciseById(event.data.exerciseId);
            this.exercises = this.exercises.map((e) => (e.id !== exercise.id ? e : exercise));
        }
    }

    async onTrainingCreation(event: ModalCloseResult) {
        if (event.type === `Confirm`) {
            await this.loadTrainingData();
        }
    }

    loadTrainingMachines(): void {
        this.trainingMachinesService.getTrainingMachinesForGym(this.gymId).then((result) => {
            if (!result) {
                this.toastService.error(`Cannot load training machines. Try again later.`);
                return;
            }
            if (result) {
                this.trainingMachines = result;
            }
        });
    }
}
