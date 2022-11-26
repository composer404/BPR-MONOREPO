import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exercise, ModalCloseResult, Training, TrainingMachines } from '../../interfaces/interfaces';

import { ExerciseService } from '../../services/exercise.service';
import { InfoService } from '../../services/info.service';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { TrainingService } from 'src/app/services/training.service';

/* eslint-disable @typescript-eslint/naming-convention */

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.component.html',
    styleUrls: ['./training-details.component.scss'],
})
export class TrainingDetailsPage implements OnInit {
    exercises: Exercise[] = [];
    trainingMachines: TrainingMachines[] = [];

    selectedTraining: Training;
    profileId: string;
    trainingId: string;
    gymId: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingMachinesService: TrainingMachinesService,
        private readonly infoService: InfoService,
        //private readonly toastService: ToastService,
       // private readonly dialogService: DialogService,
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
            this.infoService.error(`Cannot load selected training. Try again later.`);
            return;
        }
        if(result){
        this.selectedTraining = result;
        }
    }

    loadExercises(): void {
        this.exerciseService.getExercisesForTrainings(this.trainingId).then((result) => {
            if (!result) {
                this.infoService.error(`Cannot load exercises. Try again later.`);
                return;
            }
            if (result) {
                this.exercises = result;
            }
        });
    }

    async onExerciseDelete(exerciseId: string) {
        // await this.dialogService.openConfirmationDialog({
        //     header: `Are you sure?`,

            // confirmFn: async () => {
                const result = await this.exerciseService.deleteExercise(exerciseId);
                if (!result) {
                    this.infoService.error(`Cannot delete selected exercise. Try again later.`);
                    return;
                }
               this.infoService.success(`Selected exercise has been successfully deleted`);
                this.exercises = this.exercises.filter((exercise) => exercise.id !== exerciseId);
        //     },
        // });
        this.exercises = this.exercises.filter((element)=>{
            return element.id !== exerciseId
        })
    }

    async deleteTraining(): Promise<void> {
        // await this.dialogService.openConfirmationDialog({
        //     header: `Are you sure?`,

            // confirmFn: async () => {
                const result = await this.trainingService.deleteTraining(this.trainingId);
                if (!result) {
                    this.infoService.error(`Cannot delete selected training. Try again later.`);
                    return;
                }
                this.infoService.success(`Selected training has been successfully deleted`);
                this.router.navigateByUrl(`/profile-tabs/profile/${this.profileId}/training-list`);
           // },
        // });
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
                this.infoService.error(`Cannot load training machines. Try again later.`);
                return;
            }
            if (result) {
                this.trainingMachines = result;
            }
        });
    }
}
