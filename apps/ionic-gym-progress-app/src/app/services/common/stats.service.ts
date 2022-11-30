import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {SessionTotalStatistics, TrainingSession} from 'src/app/interfaces/interfaces';
import {Chart} from 'chart.js';


@Injectable({
  providedIn: 'root',
})
export class StatsService {

  @ViewChild('lineCanvasBurnedCalories') private lineCanvasBurnedCalories: ElementRef;
  @ViewChild('lineCanvasSpentTime') private lineCanvasSpentTime: ElementRef;

  lineChartBurnedCalories: any;
  lineChartTimeCalories: any;
  trainingSessions: TrainingSession[] = [];
  stats: SessionTotalStatistics;

  constructor() {}

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
    this.stats = total;
  }

}
