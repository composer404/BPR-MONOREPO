import { Component, OnInit } from '@angular/core';

import { TrainingSession } from 'src/app/interfaces/interfaces';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.page.html',
    styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
    currentSessionIndex = 0;
    trainingSessions: TrainingSession[] = [];

    sessionsView = true;
    weeklyView: boolean;
    monthlyView: boolean;

    constructor(private readonly trainingSessionService: TrainingSessionService) {}

    ngOnInit(): void {
        void this.loadSessions();
    }

    async loadSessions() {
        const sessions = await this.trainingSessionService.getSessionsByIndex(this.currentSessionIndex);

        if (sessions) {
            this.currentSessionIndex += 10;
            this.trainingSessions.push(...sessions);
        }
    }

    openSessionsView() {
        this.weeklyView = false;
        this.monthlyView = false;
        this.sessionsView = true;
    }

    openWeeklyView() {
        this.monthlyView = false;
        this.sessionsView = false;
        this.weeklyView = true;
    }

    openMonthlyView() {
        this.sessionsView = false;
        this.weeklyView = false;
        this.monthlyView = true;
    }
}
