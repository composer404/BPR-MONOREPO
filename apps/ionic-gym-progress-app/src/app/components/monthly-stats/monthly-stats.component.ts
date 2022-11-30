import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SessionTotalStatistics, TrainingSession } from 'src/app/interfaces/interfaces';

import { DateTime } from 'luxon';
import { StatsService } from '../../services/common/stats.service';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';

@Component({
    selector: 'app-monthly-stats',
    templateUrl: './monthly-stats.component.html',
    styleUrls: ['./monthly-stats.component.scss'],
})
export class MonthlyStatsComponent implements OnInit, AfterViewInit {
    @ViewChild('lineCanvasBurnedCalories') private lineCanvasBurnedCalories: ElementRef;
    @ViewChild('lineCanvasSpentTime') private lineCanvasSpentTime: ElementRef;

    lineChartBurnedCalories: any;
    lineChartTimeCalories: any;

    trainingSessions: TrainingSession[] = [];
    monthStatistics: SessionTotalStatistics;

    firstMonthDay: DateTime;
    lastMonthDay: DateTime;

    currentDate: DateTime;

    constructor(
        private readonly trainingSessionsService: TrainingSessionService,
        private readonly statsService: StatsService,
    ) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.currentDate = DateTime.now();
    }

    ngAfterViewInit() {
        this.updateDaysAndLoadData(this.currentDate);
    }

    getTimeAndCalories(chartDataSetMap: Map<string, TrainingSession[]>) {
        this.statsService.getTime(chartDataSetMap);
        this.statsService.getCalories(chartDataSetMap);
    }

    async updateDaysAndLoadData(date: DateTime) {
        const firstDay = date.startOf(`month`);
        const lastDay = date.endOf(`month`);

        firstDay.set({ minute: 0, second: 0, hour: 0, millisecond: 0 });
        lastDay.set({ minute: 59, second: 59, hour: 23, millisecond: 0 });

        this.firstMonthDay = firstDay;
        this.lastMonthDay = lastDay;

        this.trainingSessions = await this.trainingSessionsService.getSessionsByTimePeriod(
            firstDay.toISO(),
            lastDay.toISO(),
        );
        this.monthStatistics = this.statsService.calculateStatistics(this.trainingSessions);
        this.createMonthDataSet();
    }

    async minusMonth() {
        this.currentDate = this.currentDate.minus({ months: 1 });
        this.updateDaysAndLoadData(this.currentDate);
    }

    async plusMonth() {
        this.currentDate = this.currentDate.plus({ months: 1 });
        this.updateDaysAndLoadData(this.currentDate);
    }

    createMonthDataSet() {
        const map = new Map<string, TrainingSession[]>();
        for (let i = 0; i < Math.round(this.lastMonthDay.diff(this.firstMonthDay, `days`).toObject().days); i++) {
            map.set(this.firstMonthDay.plus({ days: i }).toFormat(`dd/MM`), []);
        }

        this.trainingSessions.forEach((session) => {
            const sessionDateString = DateTime.fromISO(session.createdAt).toFormat(`dd/MM`);
            if (map.has(sessionDateString)) {
                const value = map.get(sessionDateString);
                value.push(session);
                map.set(sessionDateString, value);
            }
        });

        this.initTimeLineChart(map);
        this.initBurnedCaloriesLineChart(map);
        return map;
    }

    private initTimeLineChart(chartDataSetMap: Map<string, TrainingSession[]>) {
        if (this.lineChartTimeCalories) {
            this.lineChartTimeCalories?.destroy();
        }
        this.lineChartTimeCalories = new Chart(this.lineCanvasSpentTime.nativeElement, {
            type: 'line',
            data: {
                labels: [...Array.from(chartDataSetMap.keys())],
                datasets: [
                    {
                        label: 'Time in minutes',
                        backgroundColor: 'rgba(123,39,164,1)',
                        borderColor: 'rgba(123,39,164,1)',
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(123,39,164,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [...this.statsService.getTime(chartDataSetMap)],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 5,
                        },
                    },
                },
            },
        });
    }

    private initBurnedCaloriesLineChart(chartDataSetMap: Map<string, TrainingSession[]>) {
        if (this.lineChartBurnedCalories) {
            this.lineChartBurnedCalories.destroy();
        }
        this.lineChartBurnedCalories = new Chart(this.lineCanvasBurnedCalories.nativeElement, {
            type: 'line',
            data: {
                labels: [...Array.from(chartDataSetMap.keys())],
                datasets: [
                    {
                        label: 'Burned calories',
                        backgroundColor: 'rgba(123,39,164,1)',
                        borderColor: 'rgba(123,39,164,1)',
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(123,39,164,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [...this.statsService.getCalories(chartDataSetMap)],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 20,
                        },
                    },
                },
            },
        });
    }
}
