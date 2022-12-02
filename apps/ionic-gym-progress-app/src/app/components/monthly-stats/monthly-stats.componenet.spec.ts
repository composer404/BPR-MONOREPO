/* eslint-disable no-underscore-dangle */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {MonthlyStatsComponent} from './monthly-stats.component';

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
        // @ts-ignore
      expect(DateTime.fromJSDate(component.firstMonthDay).toFormat(`dd/MM/yyyy`)).toEqual(`01/12/2022`);
        // @ts-ignore
      expect(DateTime.fromJSDate(component.lastMonthDay).toFormat(`dd/MM/yyyy`)).toEqual(`31/12/2022`);
    });

    it(`should correctly minus month`, () => {
        component.currentDate = DateTime.now();
        component.minusMonth();
        expect(component.currentDate.toFormat(`dd/MM/yyyy`)).toEqual(
            DateTime.now().minus({ days: 7 }).toFormat(`dd/MM/yyyy`),
        );
    });

    it(`should correctly plus month`, () => {
        component.currentDate = DateTime.now();
        component.plusMonth();
        expect(component.currentDate.toFormat(`dd/MM/yyyy`)).toEqual(
            DateTime.now().plus({ days: 7 }).toFormat(`dd/MM/yyyy`),
        );
    });

    it(`should correctly calculate stats`, () => {
        component.createMonthDataSet();

        expect(component.monthStatistics).toEqual({
            totalBurnedCalories: 164.51,
            totalTimeInMinutes: 21,
            completedExercises: 39,
            completedTrainingSessions: 28,
        });
    });

    it(`should correctly create training session week map`, () => {
        const map = component.createMonthDataSet();
        expect(Array.from(map.keys()).length).toEqual(7);

        expect(component.lineChartBurnedCalories.config._config.data.datasets[0].data).toEqual([
            0, 0, 5.38, 59.13, 100, 0, 0,
        ]);

        expect(component.lineChartTimeCalories.config._config.data.datasets[0].data).toEqual([0, 0, 0, 11, 10, 0, 0]);
    });
});
