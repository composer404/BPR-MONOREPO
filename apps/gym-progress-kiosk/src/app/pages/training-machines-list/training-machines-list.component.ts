import { Component, OnInit } from '@angular/core';
import { TrainingMachines } from 'src/app/interfaces/interfaces';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CreateTrainingMachineModalComponent } from 'src/app/modals/create-training-machine-modal/create-training-machine-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditTrainingMachineModalComponent } from 'src/app/modals/edit-training-machine-modal/edit-training-machine-modal.component';
import { ElectronService } from 'src/app/services/electron.service';
import { InfoService } from 'src/app/services/info.service';
import { Subscription } from 'rxjs';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';

@Component({
    selector: `app-training-machines-list-component`,
    templateUrl: `./training-machines-list.component.html`,
    styleUrls: [`./training-machines-list.component.scss`],
})
export class TrainingMachinesListComponent implements OnInit {
    subscriptions: Subscription[] = [];
    trainingMachines: TrainingMachines[] = [];
    //gymId?:string;

    constructor(
        private readonly dialogService: DialogService,
        private readonly trainingMachineService: TrainingMachinesService,
        private readonly electronService: ElectronService,
        private readonly infoService: InfoService,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        void this.getTrainingMachinesByGymId();
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

    async printQrCode(trainingMachine: TrainingMachines) {
        const result = await this.electronService.print(trainingMachine);
        if (!result) {
            this.infoService.error(`Cannot print identifier. Try again later`);
            return;
        }
        this.infoService.success(`Identifier has been successfully printed`);
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
      const ref = this.dialogService.open(EditTrainingMachineModalComponent, {
            width: `40%`,
            data: {
                ...trainingMachine,
            },
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.getTrainingMachinesByGymId();
            }),
        );
    }

    onQRGenerated(trainingMachineId: string) {
        const qrElement = document.getElementById(trainingMachineId);
        const qrImg = qrElement?.getElementsByTagName(`img`);

        if (!qrImg?.length) {
            this.infoService.error(`Error while generating machine identifiers. Try again later`);
            return;
        }

        const base64 = qrImg[0]?.src;

        this.trainingMachines.map((element) => {
            if (element.id === trainingMachineId) {
                element.qrBase64 = base64;
            }
        });
    }

    private async getTrainingMachinesByGymId() {
        this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym();
    }

    private removeTrainingMachineLocally(trainingMachineId: string) {
        this.trainingMachines = this.trainingMachines.filter((element) => {
            return element.id !== trainingMachineId;
        });
    }

}
