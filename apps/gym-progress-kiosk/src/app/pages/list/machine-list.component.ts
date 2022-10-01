import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api.endpoints';
import { Subscription } from 'rxjs';
import{ TrainingMachines } from '../../interfaces/interfaces';
import{ TrainingMachinesComponent } from './training-machines/training-machines.component';
import { TrainingMachinesService } from 'src/app/services/machineList.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-machine-list-component`,
    templateUrl: `./machine-list.component.html`,
    styleUrls: [`./machine-list.component.scss`],
})

export class MachineListComponent implements OnDestroy{
    subscriptions: Subscription[] = [];
    trainingMachines: TrainingMachines[];
    // @Input()
    // trainingMachines: TrainingMachines[];
    @Output()
    onRemove = new EventEmitter<string>();

    @Output()
    onChanges = new EventEmitter<void>();
    
    constructor( 
        private readonly httpClient: HttpClient,
        private readonly dialogService: DialogService,
       ) {}  //private readonly trainingMachinesSerivice: TrainingMachinesService
        
   
    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    // async getTrainingMachines() {
    //     const response = await this.trainingMachinesSerivice.getTrainingMachines;
    //     if (response) {
    //         this.trainingMachines = response;
    //     }
    // }


    openCreateModal() {
        const ref = this.dialogService.open(TrainingMachinesComponent, {
            header: `Add new training machine`,
            width: `40%`,
        });

        // this.subscriptions.push(
        //     ref.onClose.subscribe((data) => {
        //         if (data) {
        //             this.getTrainingMachineId(data);
        //         }
        //     }),
        // );
    }

    private getTrainingsMachinesById(id: string) {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${id}`;
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
    
}