import {AdminProfile, BPR_ADMIN_ACTIONS} from '../../../interfaces/interfaces';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import {ConfirmationModalComponent} from 'src/app/shared/confirmation-modal/confirmation-modal.component'
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../../../interfaces/local-api.endpoints';
import { Subscription } from 'rxjs';
import{ TrainingMachines } from '../../../interfaces/interfaces';
import{ TrainingMachinesComponent } from 'src/app/pages/list/training-machines/training-machines.component';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-machine-list-component`,
    templateUrl: `./machine-list.component.html`,
    styleUrls: [`./machine-list.component.scss`],
})

export class MachineListComponent implements  OnDestroy{
    admin: AdminProfile;
    subscriptions: Subscription[] = [];
   
    @Input()
    trainingMachines: TrainingMachines[];
    @Output()
    onRemove = new EventEmitter<string>();

    @Output()
    onChanges = new EventEmitter<void>();
    
    constructor( 
        private readonly httpClient: HttpClient,
        private readonly dialogService: DialogService,
       ) {}  
        
   
    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    openCreateModal() {
        const ref = this.dialogService.open(TrainingMachinesComponent, {
            header: `Add new training machine`,
            width: `100%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe((data) => {
                if (data) {
                    this.getTrainingMachinesByGymId(data);
                }
            }),
        );
    }

    private getTrainingMachinesByGymId(gymId: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/gym/${gymId}`;
        this.subscriptions.push(
            this.httpClient.get<TrainingMachines>(url).subscribe((response) => {
                if (response) {
                    this.trainingMachines.push(response);
                    return;
                }
                //error message;
            }),
        );
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