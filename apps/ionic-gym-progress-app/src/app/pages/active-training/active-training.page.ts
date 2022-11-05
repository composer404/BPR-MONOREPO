import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseStatusChange, WEBSOCKET_RESPONSE_EVENT } from 'src/app/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/api/exercise.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';

@Component({
    selector: 'app-active-training',
    templateUrl: './active-training.page.html',
    styleUrls: ['./active-training.page.scss'],
})
export class ActiveTrainingPage implements OnInit {
    gymId: string;
    trainingId: string;

    exercises: Exercise[] = [];

    trainingMachineChangeListener: any;
    trainingMachineIncommingValue: ExerciseStatusChange;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly websocketService: WebsocketService,
        private readonly exerciseService: ExerciseService,
    ) {
        this.gymId = this.route.snapshot.params.gymId;
        this.trainingId = this.route.snapshot.params.trainingId;
    }

    ngOnInit(): void {
        this.loadExercisesForTraining();
        this.listenForEvents();
    }

    finishTrainig() {}

    async loadExercisesForTraining() {
        this.exercises = await this.exerciseService.getExercisesForTrainings(this.trainingId);
    }

    private listenForEvents() {
        this.trainingMachineChangeListener = (data) => {
            console.log(`Training machine state changes`, data);
            this.trainingMachineIncommingValue = data;
        };
        this.websocketService.listenForEvent(
            WEBSOCKET_RESPONSE_EVENT.trainign_machine_status_changed,
            this.trainingMachineChangeListener,
        );
    }
}
