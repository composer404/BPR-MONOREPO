import { Component, OnInit } from '@angular/core';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CreateTrainingModalComponent } from 'src/app/modals/create-training-modal/create-training-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditTrainingModalComponent } from 'src/app/modals/edit-training-modal/edit-training-modal.component';
import { IInfoService } from 'src/app/interfaces/info-service.interface';
import { ITrainingService } from 'src/app/interfaces/training-service.interface';
import { Subscription } from 'rxjs';
import { Training } from 'src/app/interfaces/interfaces';

@Component({
    selector: `app-training-list-component`,
    templateUrl: `./training-list.component.html`,
    styleUrls: [`./training-list.component.scss`],
})
export class TrainingListComponent implements OnInit {
    subscriptions: Subscription[] = [];
    trainings: Training[] = [];

    constructor(
        private readonly dialogService: DialogService,
        private readonly trainingService: ITrainingService,
        private readonly infoService: IInfoService,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        void this.getTrainingByGymId();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    openCreateModal() {
        const ref = this.dialogService.open(CreateTrainingModalComponent, {
            header: `Add new training`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.getTrainingByGymId();
            }),
        );
    }

    async removeTrainingFromGym(training: Training) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            header: `Confirm action`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(async (result) => {
                if (result) {
                    const response = await this.trainingService.deleteTraining(training.id);
                    if (response) {
                        this.infoService.success(`Training has been successfully deleted`);
                        this.removeTrainingLocally(training.id);
                        return;
                    }
                    this.infoService.success(`Cannot delete training. Try again later.`);
                }
            }),
        );
    }

    openEditTrainingModal(training: Training) {
        const ref = this.dialogService.open(EditTrainingModalComponent, {
            width: `40%`,
            data: {
                ...training,
            },
        });
        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.getTrainingByGymId();
            }),
        );
    }

    private async getTrainingByGymId() {
        this.trainings = await this.trainingService.getAdminTrainingForGym();
    }

    private removeTrainingLocally(trainingId: string) {
        this.trainings = this.trainings.filter((element) => {
            return element.id !== trainingId;
        });
    }
}
