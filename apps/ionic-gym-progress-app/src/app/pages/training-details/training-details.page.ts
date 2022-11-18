import { ActivatedRoute, Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Exercise, ModalCloseResult, Training, TrainingMachine } from '../../interfaces/interfaces';

import { DialogService } from 'src/app/services/common/dialog.service';
import { ExerciseService } from '../../services/api/exercise.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';
import { TrainingService } from '../../services/api/trainings.service';

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
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingMachinesService: TrainingMachineService,
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

    async deleteTraining() {
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
        // this.dialogService.openConfirmationDialog()
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
                console.log(`training machines`, result);
                this.trainingMachines = result;
            }
        });
    }
}
