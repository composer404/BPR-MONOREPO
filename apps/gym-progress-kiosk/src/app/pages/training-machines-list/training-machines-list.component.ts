import { BPR_ADMIN_ACTIONS, TrainingMachines } from 'src/app/interfaces/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
    trainingMachine:TrainingMachines;
    

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
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        this.getTrainingMachinesByGymId();
      //this.getTrainingMachineById(this.trainingMachines.id);
      this.trainingMachine = this.config.data;
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

    
     async removeTrainingMachinesFromGym(trainingMachine: TrainingMachines) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
                    header: `Confirm action`,
                    width: `40%`,
                });
        // this.trainingMachines = await this.trainingMachineService.removeTrainingMachinesById();
        
    }


    
    openEditTrainingMachineModal(trainingMachine: TrainingMachines) {
        const ref = this.dialogService.open(EditTrainingMachineModalComponent, {
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

    async getTrainingMachineById(id: string) {
        const response = await this.trainingMachineService.getTrainingMachineById(id);
        if (response) {
            this.trainingMachines = response;
        }
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

     



