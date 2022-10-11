import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gym, Training } from 'src/app/interfaces/interfaces';

import { CreateTrainingModalComponent } from 'src/app/components/create-training-modal/create-training-modal.component';
import { ToastService } from 'src/app/services/common/toast.service';
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

    constructor(private readonly trainingService: TrainingService) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    async onGymSelected(gym: Gym) {
        this.selectedGym = gym;
        this.trainings = await this.trainingService.getUserTrainingForGym(this.selectedGym.id);
    }
}
