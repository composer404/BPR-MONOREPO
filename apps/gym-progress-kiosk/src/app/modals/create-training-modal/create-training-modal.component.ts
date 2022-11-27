import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalCloseResult, Training } from 'src/app/interfaces/interfaces';

import { DialogService } from 'primeng/dynamicdialog';
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
   // @ViewChild(IonModal) ionModal: IonModal;

  //  @Input() buttonTemplate: TemplateRef<any>;

   // @Input()
    gymId?: string;

  //  @Input()
    trainingId?: string;

   // @Input()
    title?: string;

  //  @Input()
    id?: string;

    @Output()
    closeEvent = new EventEmitter<ModalCloseResult>();

    trainingForm: FormGroup;
    modalTitle?: string;

    constructor(private readonly trainingService: TrainingService, 
        private readonly infoService: InfoService,
        private ref:DynamicDialogComponent,
        private readonly dialogService: DialogService,) {
        this.trainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``, [Validators.required]),
            description: new FormControl(``),
            comment: new FormControl(``),
        });
    }

    ngOnInit(): void {
        if (this.trainingId) {
            void this.loadTrainingData();
            this.modalTitle = `EDIT TRAINING`;
            return;
        }
        this.modalTitle = `CREATE TRAINING`;
    }

    // cancelTrainingCreation() {
    //     this.ionModal.dismiss(null, 'cancel');
    //     this.closeEvent.emit({
    //         type: `Close`,
    //     });
    // }

    // createTraining() {
    //     this.ionModal.dismiss(null, 'confirm');
    //     this.closeEvent.emit({
    //         type: `Confirm`,
    //     });
    // }

    async loadTrainingData() {
        const response = await this.trainingService.getTrainingById(this.trainingId);

        this.trainingForm = new FormGroup({
            title: new FormControl(response?.title, [Validators.required]),
            type: new FormControl(response?.type, [Validators.required]),
            description: new FormControl(response?.description),
            comment: new FormControl(response?.comment),
        });
    }

    // async onWillDismissModal(event: any) {
    //     if (event.detail.role !== `confirm`) {
    //         return;
    //     }

    //     const requestBody = {
    //         title: this.trainingForm.get(`title`).value,
    //         type: this.trainingForm.get(`type`).value,
    //         description: this.trainingForm.get(`description`).value,
    //         comment: this.trainingForm.get(`comment`).value,
    //         gymId: this.gymId,
    //     };

    //     if (this.trainingId) {
    //         await this.editTraining(requestBody);
    //         return;
    //     }
    //     await this.createTraining(requestBody);
    // }

    async confirmTrainingCreation() {
        const requestBody = {
            title: this.trainingForm.get(`title`)?.value,
            type: this.trainingForm.get(`type`)?.value,
            description: this.trainingForm.get(`description`)?.value,
            comment: this.trainingForm.get(`comment`)?.value,
            gymId: this.gymId,
        };

        if (this.trainingId) {
            await this.editTraining(requestBody);
            this.closeModalWithConfirm();
            return;
        }
        const result = await this.createTraining(requestBody);
        this.closeModalWithConfirm(result);
    }

    closeModalWithConfirm(trainingId?: string) {
        this.ref.close();
        this.closeEvent.emit({
            type: `Confirm`,
            data: {
                trainingId,
            },
        });
    }

    async createTraining(body: Partial<Training>) {
        const result = await this.trainingService.createTraining(body);

        if (!result) {
            this.infoService.error(`Cannot create training. Try again later.`);
            return;
        }
        this.infoService.success(`Successfully created new training`);
        return result.id;
    }

    async editTraining(body: Partial<Training>) {
        const result = await this.trainingService.editTraining(this.trainingId, body);

        if (!result) {
            this.infoService.error(`Cannot edit training. Try again later.`);
            return;
        }
        this.infoService.success(`Successfully edited training`);
    }
}