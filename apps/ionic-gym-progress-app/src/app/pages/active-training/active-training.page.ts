import { Component, OnInit } from '@angular/core';
import {
    Exercise,
    ExerciseStatusChange,
    TrainingSession,
    WEBSOCKET_RESPONSE_EVENT,
} from 'src/app/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';
import { WebsocketService } from 'src/app/services/api/websocket.service';

@Component({
    selector: 'app-active-training',
    templateUrl: './active-training.page.html',
    styleUrls: ['./active-training.page.scss'],
})
export class ActiveTrainingPage implements OnInit {
    gymId: string;
    trainingSessionId: string;

    exercises: Exercise[] = [];

    trainigSession: TrainingSession;

    trainingMachineChangeListener: any;
    trainingMachineIncommingValue: ExerciseStatusChange;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly websocketService: WebsocketService,
        private readonly trainingSessionService: TrainingSessionService,
    ) {
        this.gymId = this.route.snapshot.params.gymId;
        this.trainingSessionId = this.route.snapshot.params.sessionId;
    }

    ngOnInit(): void {
        this.loadTrainingSession();
        this.listenForEvents();
    }

    finishTrainig() {}

    async loadTrainingSession() {
        this.trainigSession = await this.trainingSessionService.getTrainingSessionById(this.trainingSessionId);
    }

    private listenForEvents() {
        this.trainingMachineChangeListener = (data) => {
            this.trainingMachineIncommingValue = data;
        };
        this.websocketService.listenForEvent(
            WEBSOCKET_RESPONSE_EVENT.trainign_machine_status_changed,
            this.trainingMachineChangeListener,
        );
    }
}
