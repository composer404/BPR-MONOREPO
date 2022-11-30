import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SessionTotalStatistics, TrainingSession} from 'src/app/interfaces/interfaces';
import {DateTime} from 'luxon';
import {TrainingSessionService} from 'src/app/services/api/training-session.service';
import {Chart, registerables} from 'chart.js';
import {StatsService} from '../../services/common/stats.service';

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
  weekStatistics: SessionTotalStatistics;

  firstMonth: Date;
  lastMonth: Date;

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

  // getFirstMonth(d: Date) {
  //   const date = new Date(d);
  //   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //   const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // }

  async updateDaysAndLoadData(date: Date) {

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // lastDay.setDate(lastDay.getDate() + 30);
    firstDay.setHours(0);
    firstDay.setMinutes(0);
    firstDay.setSeconds(0);

    lastDay.setHours(23);
    lastDay.setMinutes(59);
    lastDay.setSeconds(0);

    this.firstMonth = firstDay;
    this.lastMonth = lastDay;

    this.trainingSessions = await this.trainingSessionsService.getSessionsByTimePeriod(
    firstDay.toISOString(),
    lastDay.toISOString(),
  );
  this.statsService.calculateStatistics();
  this.createMonthDataSet();
   }

  async minusMonth() {
    this.currentDate = this.currentDate.minus({ months: 1 });
    this.updateDaysAndLoadData(this.currentDate.toJSDate());
  }

  async plusMonth() {
    this.currentDate = this.currentDate.plus({ months: 1 });
    this.updateDaysAndLoadData(this.currentDate.toJSDate());
  }

  createMonthDataSet() {
    const map = new Map<string, TrainingSession[]>();

    const first = DateTime.fromJSDate(this.firstMonth);
    for (let i = 0; i < 12; i++) {
      map.set(first.plus({ days: i }).toFormat(`dd/MM/yyyy`), []);
    }

    this.trainingSessions.forEach((session) => {
      const sessionDateString = DateTime.fromISO(session.createdAt).toFormat(`dd/MM/yyyy`);
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
