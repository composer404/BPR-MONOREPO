import { Component, OnInit } from '@angular/core';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
// import { ConfirmationService } from 'primeng/api';
import { CreateTrainingMachineModalComponent } from 'src/app/modals/create-training-machine-modal/create-training-machine-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditTrainingMachineModalComponent } from 'src/app/modals/edit-training-machine-modal/edit-training-machine-modal.component';
import { ElectronService } from 'src/app/services/electron.service';
import { InfoService } from 'src/app/services/info.service';
// import { HttpClient } from '@angular/common/http';
// import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
// import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TrainingMachines } from 'src/app/interfaces/interfaces';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';

// import { environment } from 'src/environments/environment';

@Component({
    selector: `app-training-machines-list-component`,
    templateUrl: `./training-machines-list.component.html`,
    styleUrls: [`./training-machines-list.component.scss`],
})
export class TrainingMachinesListComponent implements OnInit {
    // admin: AdminProfile;
    gymId = `278e3def-aedf-4ccd-b4a1-0e2954b7f796`;
    subscriptions: Subscription[] = [];
    trainingMachines: TrainingMachines[] = [];
    // trainingMachine: TrainingMachines;

    // @Output()
    // onRemove = new EventEmitter<string>();

    // @Output()
    // onChanges = new EventEmitter<void>();

    constructor(
        // private readonly httpClient: HttpClient,
        private readonly dialogService: DialogService,
        private readonly trainingMachineService: TrainingMachinesService,
        private readonly electronService: ElectronService,
        private readonly infoService: InfoService,
        // private confirmationService: ConfirmationService,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        void this.getTrainingMachinesByGymId();
        //this.getTrainingMachineById(this.trainingMachines.id);
        // this.trainingMachine = this.config.data;
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    openCreateModal() {
        const ref = this.dialogService.open(CreateTrainingMachineModalComponent, {
            header: `Add new training machine`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.getTrainingMachinesByGymId();
            }),
        );
    }

    printQrCode(trainingMachine: TrainingMachines) {
        this.electronService.print();
    }

    async removeTrainingMachinesFromGym(trainingMachine: TrainingMachines) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            header: `Confirm action`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(async (result) => {
                if (result) {
                    const response = await this.trainingMachineService.removeTrainingMachinesById(trainingMachine.id);
                    if (response) {
                        this.infoService.success(`Training machine has been successfully deleted`);
                        this.removeTrainingMachineLocally(trainingMachine.id);
                        return;
                    }
                    this.infoService.success(`Cannot delete training machine. Try again later.`);
                }
            }),
        );
    }

    openEditTrainingMachineModal(trainingMachine: TrainingMachines) {
        this.dialogService.open(EditTrainingMachineModalComponent, {
            width: `40%`,
            data: {
                ...trainingMachine,
            },
        });

        // this.subscriptions.push(
        //     ref.onClose.subscribe(() => {
        //         this.getTrainingMachinesByGymId();
        //     }),
        // );
        // this.subscriptions.push(
        //     ref.onClose.subscribe((data) => {
        //         if (data) {
        //             this.getTrainingMachineById(data);
        //         }
        //     }),
        // );
    }

    // async getTrainingMachineById(id: string) {
    //     const response = await this.trainingMachineService.getTrainingMachineById(id);
    //     if (response) {
    //         this.trainingMachines = response;
    //     }
    // }

    private async getTrainingMachinesByGymId() {
        this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym();
    }

    private removeTrainingMachineLocally(trainingMachineId: string) {
        this.trainingMachines = this.trainingMachines.filter((element) => {
            return element.id !== trainingMachineId;
        });
    }

    // onClickTrainingMachine(data: any) {
    //     const ref = this.dialogService.open(EditTrainingMachineModalComponent, {
    //         header: `${data.name}`,
    //         width: `80%`,
    //         data: {
    //             id: data.id
    //         },
    //     });

    //     this.subscriptions.push(
    //         ref.onClose.subscribe(() => {
    //             this.onChanges.emit();
    //         }),
    //     );
    // }
}
