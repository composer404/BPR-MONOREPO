import { BPR_ADMIN_ACTIONS, TrainingMachines } from 'src/app/interfaces/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ConfirmationService } from 'primeng/api';
import { CreateTrainingMachineModalComponent } from 'src/app/modals/create-training-machine-modal/create-training-machine-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import {EditTrainingMachineModalComponent} from 'src/app/modals/edit-training-machine-modal/edit-training-machine-modal.component'
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-training-machines-list-component`,
    templateUrl: `./training-machines-list.component.html`,
    styleUrls: [`./training-machines-list.component.scss`],
})
export class TrainingMachinesListComponent implements OnInit {
    // admin: AdminProfile;
     gymId = `278e3def-aedf-4ccd-b4a1-0e2954b7f796`;
    subscriptions: Subscription[] = [];
    trainingMachines: TrainingMachines[]= [] ;
    

    @Output()
    onRemove = new EventEmitter<string>();

    @Output()
    onChanges = new EventEmitter<void>();

    constructor(
        private readonly httpClient: HttpClient,
        private readonly dialogService: DialogService,
        private readonly trainingMachineService: TrainingMachinesService,
        // private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.getTrainingMachinesByGymId();
        //  this.removeTrainingMachinesByGymId();
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

    private async getTrainingMachinesByGymId() {
        this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym();
        console.log(this.trainingMachines)
    }

    
     async removeTrainingMachinesFromGym() {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
                    header: `Confirm action`,
                    width: `40%`,
                });
        this.trainingMachines = await this.trainingMachineService.removeTrainingMachinesByGymId();
        
    }

    // onEdit(data: any) {
    //     const ref = this.dialogService.open(CreateTrainingMachineModalComponent, {
    //         header: `${data.name}`,
    //         width: `80%`,
    //         data: {
    //             id: data.id,
    //         },
    //     });

    //     this.subscriptions.push(
    //         ref.onClose.subscribe(() => {
    //             this.onChanges.emit();
    //         }),
    //     );
    // }

    
    openEditTrainingMachineModal() {
        const ref = this.dialogService.open(EditTrainingMachineModalComponent, {
            width: `40%`,
            data: {
                ...this.trainingMachines,
            },
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.getTrainingMachinesByGymId();
            }),
        );
    }

}

     



