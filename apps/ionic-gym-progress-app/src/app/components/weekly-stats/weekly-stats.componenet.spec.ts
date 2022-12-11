/* eslint-disable no-underscore-dangle */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { WeeklyStatsComponent } from './weekly-stats.component';
import mockedStats from './mocked-stats';

describe('WeeklyStatsComponent', () => {
    let component: WeeklyStatsComponent;
    let fixture: ComponentFixture<WeeklyStatsComponent>;
    let nativeElement: HTMLElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WeeklyStatsComponent],
            imports: [CommonModule, HttpClientModule, HttpClientTestingModule],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(WeeklyStatsComponent);
        fixture.detectChanges(false);
        fixture.detectChanges();
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        router = TestBed.inject(Router);

        router.initialNavigation();
    });

    it(`should create`, async () => {
        await expect(component).toBeTruthy();
        expect(component).toBeInstanceOf(WeeklyStatsComponent);
        await expect(nativeElement).toBeTruthy();
        expect(nativeElement).toBeInstanceOf(HTMLElement);
    });

    it(`should correctly set first and last day of week`, () => {
        const mockDate = new Date(1669748352000);
        component.updateDaysAndLoadData(mockDate);

        expect(DateTime.fromJSDate(component.firstWeekDay).toFormat(`dd/MM/yyyy`)).toEqual(`28/11/2022`);
        expect(DateTime.fromJSDate(component.lastWeekDay).toFormat(`dd/MM/yyyy`)).toEqual(`04/12/2022`);
    });

    it(`should correctly minus week`, () => {
        component.currentDate = DateTime.now();
        component.minusWeek();
        expect(component.currentDate.toFormat(`dd/MM/yyyy`)).toEqual(
            DateTime.now().minus({ days: 7 }).toFormat(`dd/MM/yyyy`),
        );
    });

    it(`should correctly plus week`, () => {
        component.currentDate = DateTime.now();
        component.plusWeek();
        expect(component.currentDate.toFormat(`dd/MM/yyyy`)).toEqual(
            DateTime.now().plus({ days: 7 }).toFormat(`dd/MM/yyyy`),
        );
    });

    it(`should correctly calculate stats`, () => {
        component.trainingSessions = mockedStats;
        component.createWeekDataSet();

        expect(component.weekStatistics).toEqual({
            totalBurnedCalories: 164.51,
            totalTimeInMinutes: 21,
            completedExercises: 39,
            completedTrainingSessions: 28,
        });
    });

    it(`should correctly create training session week map`, () => {
        //Arrange
        component.trainingSessions = mockedStats;
        const mockDate = new Date(1669491042000);

        //Act
        component.updateDaysAndLoadData(mockDate);
        const map = component.createWeekDataSet();

        //Assert
        expect(Array.from(map.keys()).length).toEqual(7);
        expect(component.lineChartBurnedCalories.config._config.data.datasets[0].data).toEqual([
            0, 0, 5.38, 59.13, 100, 0, 0,
        ]);
        expect(component.lineChartTimeCalories.config._config.data.datasets[0].data).toEqual([0, 0, 0, 11, 10, 0, 0]);
    });
});
