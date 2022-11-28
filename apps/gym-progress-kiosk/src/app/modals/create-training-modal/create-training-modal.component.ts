import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalCloseResult, Training } from 'src/app/interfaces/interfaces';

import { DynamicDialogComponent } from 'primeng/dynamicdialog';
import { InfoService } from 'src/app/services/info.service';
import { TrainingService } from 'src/app/services/training.service';

//import { ToastService } from 'src/app/services/common/toast.service';


//import { IonModal } from '@ionic/angular';



@Component({
    selector: 'app-create-training-modal',
    templateUrl: './create-training-modal.component.html',
    styleUrls: ['./create-training-modal.component.scss'],
})
export class CreateTrainingModalComponent implements OnInit {
    trainingForm: FormGroup;
  
    constructor(private readonly trainingService: TrainingService, 
        private readonly infoService: InfoService,
        private ref:DynamicDialogRef,
    ) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    ngOnInit(): void {
    }

    async createTraining(): Promise<void> {
        const response = await this.trainingService.createTraining({
            title: this.trainingForm?.get(`title`)?.value,
            type: this.trainingForm?.get(`type`)?.value || ``,
            description: this.trainingForm?.get(`description`)?.value || ``,
            comment: this.trainingForm.get(`comment`)?.value || ``,
        });

        if (response) {
            this.close();
        }
    }

    close(): void {
        this.ref.close(null);
    }

   
}
