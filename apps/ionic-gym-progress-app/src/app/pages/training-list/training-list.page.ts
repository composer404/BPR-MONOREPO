import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gym, ModalCloseResult, Training } from 'src/app/interfaces/interfaces';

import { Component } from '@angular/core';
import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.page.html',
    styleUrls: ['./training-list.page.scss'],
})
export class TrainingListPage {
    trainingForm: FormGroup;
    userId: string;
    trainings: Training[] = [];
    selectedGym: Gym;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly trainingService: TrainingService,
    ) {
        this.userId = this.route.snapshot.params.id;
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    goToTrainingDetails(trainingId: string): void {
        void this.router.navigate([
            `/profile-tabs/profile/${this.userId}/training-list/${trainingId}/gym/${this.selectedGym.id}`,
        ]);
    }

    async onTrainingCreation(event: ModalCloseResult) {
        if (event.type === `Confirm`) {
            const newTraining = await this.trainingService.getTrainingById(event.data.trainingId);
            this.trainings.push(newTraining);
        }
    }

    async onGymSelected(gym: Gym) {
        this.selectedGym = gym;
        this.trainings = await this.trainingService.getUserTrainingForGym(this.selectedGym.id);
    }
}
