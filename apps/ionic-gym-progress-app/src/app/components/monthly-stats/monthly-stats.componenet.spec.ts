/* eslint-disable no-underscore-dangle */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MonthlyStatsComponent } from './monthly-stats.component';
import { Router } from '@angular/router';
import mockedStats from '../weekly-stats/mocked-stats';

describe('MonthlyStatsComponent', () => {
    let component: MonthlyStatsComponent;
    let fixture: ComponentFixture<MonthlyStatsComponent>;
    let nativeElement: HTMLElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MonthlyStatsComponent],
            imports: [CommonModule, HttpClientModule, HttpClientTestingModule],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(MonthlyStatsComponent);
        fixture.detectChanges(false);
        fixture.detectChanges();
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        router = TestBed.inject(Router);

        router.initialNavigation();
    });

    it(`should create`, async () => {
        await expect(component).toBeTruthy();
        expect(component).toBeInstanceOf(MonthlyStatsComponent);
        await expect(nativeElement).toBeTruthy();
        expect(nativeElement).toBeInstanceOf(HTMLElement);
    });

    it(`should correctly set first and last day of month`, () => {
        expect(component.firstMonthDay.toFormat(`dd/MM`)).toEqual(`01/12`);
        expect(component.lastMonthDay.toFormat(`dd/MM`)).toEqual(`31/12`);
    });

    it(`should correctly minus month`, () => {
        component.currentDate = DateTime.now();
        component.minusMonth();
        expect(component.currentDate.toFormat(`dd/MM`)).toEqual(DateTime.now().minus({ months: 1 }).toFormat(`dd/MM`));
    });

    it(`should correctly plus month`, () => {
        component.currentDate = DateTime.now();
        component.plusMonth();
        expect(component.currentDate.toFormat(`dd/MM`)).toEqual(DateTime.now().plus({ months: 1 }).toFormat(`dd/MM`));
    });

    it(`should correctly calculate stats`, () => {
        component.trainingSessions = mockedStats;

        component.createMonthDataSet();

        expect(component.monthStatistics).toEqual({
            totalBurnedCalories: 164.51,
            totalTimeInMinutes: 21,
            completedExercises: 39,
            completedTrainingSessions: 28,
        });
    });

    it(`should correctly create training session week map`, () => {
        component.trainingSessions = mockedStats;
        const mockDate = new Date(1669748352000);
        component.updateDaysAndLoadData(DateTime.fromJSDate(mockDate));
        const map = component.createMonthDataSet();

        expect(Array.from(map.keys()).length).toEqual(30);

        const caloriesResultArray: number[] = Array(30).fill(0);
        caloriesResultArray[22] = 5.38;
        caloriesResultArray[23] = 59.13;
        caloriesResultArray[24] = 100;

        const timeResultArray: number[] = Array(30).fill(0);
        timeResultArray[23] = 11;
        timeResultArray[24] = 10;

        expect(component.lineChartBurnedCalories.config._config.data.datasets[0].data).toEqual(caloriesResultArray);
        expect(component.lineChartTimeCalories.config._config.data.datasets[0].data).toEqual(timeResultArray);
    });
});
