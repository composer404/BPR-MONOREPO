import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SessionTotalStatistics, TrainingSession } from 'src/app/interfaces/interfaces';

import { DateTime } from 'luxon';
import { TrainingSessionService } from 'src/app/services/api/training-session.service';

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

    constructor(private readonly trainingSessionsService: TrainingSessionService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.currentDate = DateTime.now();
    }

    ngAfterViewInit() {
        this.updateDaysAndLoadData(this.currentDate.toJSDate());
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
        this.calculateStatistics();
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

    initBurnedCaloriesLineChart(chartDataSetMap: Map<string, TrainingSession[]>) {
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
                        data: [...this.getCalories(chartDataSetMap)],
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

    initTimeLineChart(chartDataSetMap: Map<string, TrainingSession[]>) {
        if (this.lineChartTimeCalories) {
            this.lineChartTimeCalories.destroy();
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
                        data: [...this.getTime(chartDataSetMap)],
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

    getTime(chartDataSetMap: Map<string, TrainingSession[]>) {
        const arrayToReturn = [];
        for (const [key, value] of chartDataSetMap) {
            let timeByDay = 0;
            value.forEach((session) => {
                session.sessionExercises.forEach((exercise) => {
                    timeByDay += exercise.timeInMinutes;
                });
            });
            arrayToReturn.push(timeByDay);
        }
        return arrayToReturn;
    }

    calculateStatistics() {
        const total: SessionTotalStatistics = {
            totalBurnedCalories: 0,
            totalTimeInMinutes: 0,
            completedExercises: 0,
            completedTrainingSessions: 0,
        };

        this.trainingSessions.forEach((session) => {
            if (session.completed) {
                total.completedTrainingSessions += 1;
            }

            session.sessionExercises.forEach((exercise) => {
                if (exercise.completed) {
                    total.completedExercises += 1;
                    total.totalBurnedCalories += exercise.burnedCalories;
                    total.totalTimeInMinutes += exercise.timeInMinutes;
                }
            });
        });
        this.weekStatistics = total;
    }

    createWeekDataSet() {
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

        this.initTimeLineChart(map);
        this.initBurnedCaloriesLineChart(map);
        return map;
    }
}
