import { Chart, registerables } from 'chart.js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DateTime } from 'luxon';
import { TrainingSession } from 'src/app/interfaces/interfaces';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';

@Component({
    selector: 'app-weekly-stats',
    templateUrl: './weekly-stats.component.html',
    styleUrls: ['./weekly-stats.component.scss'],
})
export class WeeklyStatsComponent implements OnInit {
    @ViewChild('lineCanvas') private lineCanvas: ElementRef;

    lineChart: any;

    trainingSessions: TrainingSession[] = [];
    firstWeekDay: Date;
    lastWeekDay: Date;

    constructor(private readonly trainingSessionsService: TrainingSessionService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.getCurrentWeek();
    }

    getFirstDayOfWeek(d: Date) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    async getCurrentWeek() {
        const today = new Date();
        const firstDay = this.getFirstDayOfWeek(today);

        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);

        firstDay.setHours(0);
        firstDay.setMinutes(0);
        firstDay.setSeconds(0);

        lastDay.setHours(23);
        lastDay.setMinutes(59);
        lastDay.setSeconds(0);

        this.firstWeekDay = firstDay;
        this.lastWeekDay = firstDay;

        this.trainingSessions = await this.trainingSessionsService.getSessionsByTimePeriod(
            firstDay.toISOString(),
            lastDay.toISOString(),
        );
        this.createWeekDataSet();
    }

    initLineChart(chartDataSetMap: Map<string, TrainingSession[]>) {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: [...Array.from(chartDataSetMap.keys())],
                datasets: [
                    {
                        label: 'Sell per week',
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [...this.getCalories(chartDataSetMap)],
                        spanGaps: false,
                    },
                ],
            },
        });
    }

    getCalories(chartDataSetMap: Map<string, TrainingSession[]>) {
        const arrayToReturn = [];
        for (const [key, value] of chartDataSetMap) {
            let caloriesByDay = 0;
            value.forEach((session) => {
                session.sessionExercises.forEach((exercise) => {
                    caloriesByDay += exercise.burnedCalories;
                });
            });
            arrayToReturn.push(caloriesByDay);
        }
        return arrayToReturn;
    }

    createWeekDataSet() {
        const map = new Map<string, TrainingSession[]>();

        const first = DateTime.fromJSDate(this.firstWeekDay);
        for (let i = 0; i < 7; i++) {
            map.set(first.plus({ days: i }).toFormat(`yyyy-MM-dd`), []);
        }

        this.trainingSessions.forEach((session) => {
            const sessionDateString = DateTime.fromISO(session.createdAt).toFormat(`yyyy-MM-dd`);
            if (map.has(sessionDateString)) {
                const value = map.get(sessionDateString);
                value.push(session);
                map.set(sessionDateString, value);
            }
        });
        this.initLineChart(map);
        return map;
    }
}
