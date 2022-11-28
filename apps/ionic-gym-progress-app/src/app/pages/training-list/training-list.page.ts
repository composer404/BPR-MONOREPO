import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gym, ModalCloseResult, Training } from 'src/app/interfaces/interfaces';

import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.page.html',
    styleUrls: ['./training-list.page.scss'],
})
export class TrainingListPage implements OnDestroy {
    trainingForm: FormGroup;
    userId: string;
    trainings: Training[] = [];
    selectedGym: Gym;
    subs = new Subscription();

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

        this.subs.add(
            route.params.subscribe((val) => {
                if (this.selectedGym) {
                    this.loadTrainings();
                }
            }),
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    goToTrainingDetails(trainingId: string): void {
        void this.router.navigate([
            `/profile-tabs/profile/${this.userId}/training-list/${trainingId}/gym/${this.selectedGym.id}`,
        ]);
    }

    async loadTrainings() {
        this.trainings = await this.trainingService.getUserTrainingForGym(this.selectedGym.id);
    }

    async onTrainingCreation(event: ModalCloseResult) {
        if (event.type === `Confirm`) {
            const newTraining = await this.trainingService.getTrainingById(event.data.trainingId);
            this.trainings.push(newTraining);
        }
    }

    async onAssignedTraining() {
        await this.loadTrainings();
    }

    async onGymSelected(gym: Gym) {
        this.selectedGym = gym;
        this.trainings = await this.trainingService.getUserTrainingForGym(this.selectedGym.id);
    }
}
