import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SessionTotalStatistics, TrainingSession } from 'src/app/interfaces/interfaces';

import { DateTime } from 'luxon';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';
import {StatsService} from '../../services/common/stats.service';

@Component({
    selector: 'app-weekly-stats',
    templateUrl: './weekly-stats.component.html',
    styleUrls: ['./weekly-stats.component.scss'],
})
export class WeeklyStatsComponent implements OnInit, AfterViewInit {
    @ViewChild('lineCanvasBurnedCalories') private lineCanvasBurnedCalories: ElementRef;
    @ViewChild('lineCanvasSpentTime') private lineCanvasSpentTime: ElementRef;

    lineChartBurnedCalories: any;
    lineChartTimeCalories: any;

    trainingSessions: TrainingSession[] = [];
    weekStatistics: SessionTotalStatistics;

    firstWeekDay: Date;
    lastWeekDay: Date;

    currentDate: DateTime;

    constructor(private readonly trainingSessionsService: TrainingSessionService,
                private readonly statsService: StatsService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.currentDate = DateTime.now();
    }

    ngAfterViewInit() {
        this.updateDaysAndLoadData(this.currentDate.toJSDate());
    }

    getTimeAndCalories(chartDataSetMap: Map<string, TrainingSession[]>) {
      this.statsService.getTime(chartDataSetMap);
      this.statsService.getCalories(chartDataSetMap);
    }

    getFirstDayOfWeek(d: Date) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    async updateDaysAndLoadData(date: Date) {
        const firstDay = this.getFirstDayOfWeek(date);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);

        firstDay.setHours(0);
        firstDay.setMinutes(0);
        firstDay.setSeconds(0);

        lastDay.setHours(23);
        lastDay.setMinutes(59);
        lastDay.setSeconds(0);

        this.firstWeekDay = firstDay;
        this.lastWeekDay = lastDay;

        this.trainingSessions = await this.trainingSessionsService.getSessionsByTimePeriod(
            firstDay.toISOString(),
            lastDay.toISOString(),
        );
        this.statsService.calculateStatistics();
        this.createWeekDataSet();
    }

    async minusWeek() {
        this.currentDate = this.currentDate.minus({ days: 7 });
        this.updateDaysAndLoadData(this.currentDate.toJSDate());
    }

    async plusWeek() {
        this.currentDate = this.currentDate.plus({ days: 7 });
        this.updateDaysAndLoadData(this.currentDate.toJSDate());
    }

    createWeekDataSet() {
        if (!this.trainingSessions.length) {
            this.lineChartBurnedCalories?.destroy();
            this.lineChartTimeCalories?.destroy();
            return;
        }

        const map = new Map<string, TrainingSession[]>();

        const first = DateTime.fromJSDate(this.firstWeekDay);
        for (let i = 0; i < 7; i++) {
            map.set(first.plus({ days: i }).toFormat(`dd/MM`), []);
        }

        this.trainingSessions.forEach((session) => {
            const sessionDateString = DateTime.fromISO(session.createdAt).toFormat(`dd/MM`);
            if (map.has(sessionDateString)) {
                const value = map.get(sessionDateString);
                value.push(session);
                map.set(sessionDateString, value);
            }
        });

        this.statsService.initTimeLineChart(map);
        this.statsService.initBurnedCaloriesLineChart(map);
        return map;
    }
}
