import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gym, Training } from 'src/app/interfaces/interfaces';
import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.page.html',
    styleUrls: ['./training-list.page.scss'],
})
export class TrainingListPage {

    trainingForm: FormGroup;
    trainings: Training[];
    selectedGym: Gym;

    constructor(private router: Router,
                private readonly trainingService: TrainingService) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    public goToTrainingDetails(): void {
        this.router.navigate(['training-list']);
    }

    async onGymSelected(gym: Gym) {
        this.selectedGym = gym;
        this.trainings = await this.trainingService.getAllTrainingsForUser(this.selectedGym.id);
    }
}
