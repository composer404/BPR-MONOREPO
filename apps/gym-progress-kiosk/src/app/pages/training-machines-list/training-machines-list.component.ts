import { BPR_ADMIN_ACTIONS, TrainingMachines } from 'src/app/interfaces/interfaces';
import { Component, EventEmitter, Output } from '@angular/core';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CreateTrainingMachineModalComponent } from 'src/app/modals/create-training-machine-modal/create-training-machine-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { Subscription } from 'rxjs';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-training-machines-list-component`,
    templateUrl: `./training-machines-list.component.html`,
    styleUrls: [`./training-machines-list.component.scss`],
})
export class TrainingMachinesListComponent {
    // admin: AdminProfile;

    subscriptions: Subscription[] = [];
    trainingMachines: TrainingMachines[] = [];

    @Output()
    onRemove = new EventEmitter<string>();

    @Output()
    onChanges = new EventEmitter<void>();

    constructor(
        private readonly httpClient: HttpClient,
        private readonly dialogService: DialogService,
        private readonly trainingMachineService: TrainingMachinesService,
    ) {}

    ngOnInit(): void {
        this.getTrainingMachinesByGymId();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    openCreateModal() {
        const ref = this.dialogService.open(CreateTrainingMachineModalComponent, {
            header: `Add new training machine`,
            width: `100%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.getTrainingMachinesByGymId();
            }),
        );
    }

    private async getTrainingMachinesByGymId() {
        this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym();
    }

    onRemoveTrainingMachines(gymId: string) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            header: `Confirm action`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe((data: BPR_ADMIN_ACTIONS) => {
                if (data === BPR_ADMIN_ACTIONS.confirm) {
                    const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${gymId}`;
                    this.subscriptions.push(
                        this.httpClient.delete<boolean>(url).subscribe((response) => {
                            if (response) {
                                this.trainingMachines = this.trainingMachines.filter((element) => {
                                    return element.gymId !== gymId;
                                });
                                this.onRemove.emit(gymId);
                            }
                        }),
                    );
                }
            }),
        );
    }
}
