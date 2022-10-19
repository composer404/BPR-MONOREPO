/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Exercise, Training, TrainingMachine } from '../../interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../services/api/exercise.service';
import { TrainingMachineService } from 'src/app/services/api/training-machine.service';
import { TrainingService } from '../../services/api/trainings.service';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.page.html',
    styleUrls: ['./training-details.page.scss'],
})
export class TrainingDetailsPage implements OnInit {
    // form: FormGroup;
    //! it is important to init an empty array. It will eliminate all potential `of undefined` problems
    exercises: Exercise[] = [];
    trainingMachines: TrainingMachine[] = [];

    selectedTraining: Training;
    trainingId: string;
    gymId: string;

    constructor(
        private route: ActivatedRoute,
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingMachinesService: TrainingMachineService,
    ) {
        this.trainingId = this.route.snapshot.params.trainingId;
        this.gymId = this.route.snapshot.params.gymId;
        //! We only want do display data no form needed
        // this.form = new FormGroup({
        //     title: new FormControl(``, [Validators.required]),
        //     description: new FormControl(``),
        //     exercise_type: new FormControl(``),
        //     muscle_group: new FormControl(``),
        //     quantity: new FormControl(``),
        // });
    }

    ngOnInit(): void {
        this.loadTrainingData();
        this.loadExercises();
        this.loadTrainingMachines();
    }

    loadTrainingData(): void {
        //! Again no from needed, assign to varaible is enough
        //! When you use obervables/subscriptions it is very important to handle errors this is the best way,
        //! but I recommend to change it to promise in the service as it is for exercises
        this.trainingService.getTrainingById(this.trainingId).subscribe({
            next: (training: Training) => {
                this.selectedTraining = training;
            },
            error: () => {
                //Something went wrong
            },
        });
        // this.trainingService.getTrainingById(this.trainingId).subscribe((training) => {
        // this.form = new FormGroup({
        //     title: new FormControl(training.title),
        //     type: new FormControl(training.type),
        //     description: new FormControl(training.description),
        //     comment: new FormControl(training.comment),
        // });
        // });
    }

    //! New method responsible only for loading exerciese
    loadExercises(): void {
        this.exerciseService.getExercisesForTrainings(this.trainingId).then((result) => {
            if (!result) {
                // err
                return;
            }
            if (result) {
                this.exercises = result;
            }
        });
    }

    //! we can load it here and pass by input to all subcomponenets (optimalization)
    loadTrainingMachines(): void {
        this.trainingMachinesService.getTrainingMachinesForGym(this.gymId).then((result) => {
            if (!result) {
                // err
                return;
            }
            if (result) {
                this.trainingMachines = result;
                console.log(`training mahinces`, this.trainingMachines);
            }
        });
    }

    //! We already have selected training, so exercises should be loaded oninint
    // async onTrainingSelected(training: Training) {
    //     this.selectedTraining = training;
    //     this.exercises = await this.exerciseService.getExercisesForTrainings(this.selectedTraining.id);
    // }
}
