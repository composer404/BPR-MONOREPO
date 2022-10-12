// import { BPRApiCreatedObject, TrainingMachines } from 'src/app/interfaces/interfaces'
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// import { BPR_ADMIN_ACTIONS } from 'src/app/interfaces/interfaces';
// import { HttpClient } from '@angular/common/http';
// import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
// import { MessageService } from 'primeng/api';
// import { TrainingMachinesService } from 'src/app/services/training-machines.service';
// import { environment } from 'src/environments/environment';
// import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
    // actions = BPR_ADMIN_ACTIONS;
    // trainingMachine:TrainingMachines;

    constructor(
        // private readonly httpClient: HttpClient,
        // private readonly messageService: MessageService,
        public ref: DynamicDialogRef,
    ) // public config: DynamicDialogConfig,
    // private readonly trainingMachineService: TrainingMachinesService,
    {}

    // ngOnInit(): void {
    //     // this.trainingMachine = this.config.data;
    // }

    // async removeTrainingMachinesById() {
    //     const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.trainingMachines}/${this.trainingMachine.id}`;
    //     const response = await firstValueFrom(this.httpClient.delete<TrainingMachines[]>(url, {}));

    //     // if (!reponse) {
    //     //     this.infoService.error('Cannot remove training machine. Try again later');
    //     //     // return;
    //     // }

    //     // this.trainingMachine = this.trainingMachine.filter((element) => {
    //     //     return element.this.trainingMachine.id !== this.trainingMachine.id;
    //     // });
    //     if (!response) {
    //         this.messageService.add({
    //             severity: 'error',
    //             summary: 'Error',
    //             detail: 'Training Machine removal failed. Try again later',
    //         });
    //         this.ref.close(false);
    //         return;
    //     }
    //     this.messageService.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: 'Training Machine has been succesfully removed',
    //     });
    //     this.ref.close(this.config.data.id);

    // }

    // close(adminAction: BPR_ADMIN_ACTIONS): void {
    //     this.ref.close(adminAction);
    // }
    onClose(result: boolean): void {
        this.ref.close(result);
    }
}
