import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { IonModal } from '@ionic/angular';
import { ToastService } from 'src/app/services/common/toast.service';
import { Training } from 'src/app/interfaces/interfaces';
import { TrainingService } from 'src/app/services/api/trainings.service';

@Component({
    selector: 'app-predefined-training-modal',
    templateUrl: './predefined-training-modal.component.html',
    styleUrls: ['./predefined-training-modal.component.scss'],
})
export class PredefinedTrainingModalComponent implements OnInit {
    @ViewChild(IonModal) ionModal: IonModal;

    @Input() buttonTemplate: TemplateRef<any>;

    @Input()
    title: string;

    @Input()
    id: string;

    @Input()
    gymId: string;

    @Output()
    assignedTraining = new EventEmitter<void>();

    predefinedTrainings: Training[];

    constructor(private readonly trainingService: TrainingService, private readonly toastService: ToastService) {}

    ngOnInit(): void {
        void this.loadPredefinedTrainings();
    }

    async loadPredefinedTrainings() {
        const result = await this.trainingService.getTrainingsCreatedByAdmin(this.gymId);

        if (!result) {
            this.toastService.error(`Cannot load predefined trainings. Try again later`);
            return;
        }

        this.predefinedTrainings = result;
    }

    onClose(result: boolean) {
        if (result) {
            this.assignedTraining.emit();
            this.ionModal.dismiss(null, `confirm`);
            return;
        }
        this.ionModal.dismiss(null, `cancel`);
    }
}
