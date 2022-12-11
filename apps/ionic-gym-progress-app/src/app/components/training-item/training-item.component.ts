import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITrainingsService } from 'src/app/interfaces/trainings-service.interface';
import { ToastService } from 'src/app/services/common/toast.service';
import { Training } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-training-item',
    templateUrl: './training-item.component.html',
    styleUrls: ['./training-item.component.scss'],
})
export class TrainingItemComponent implements OnInit {
    @Input()
    training: Training;

    @Input()
    activeTraining: boolean;

    @Input()
    gymId: string;

    @Input()
    predefinedTraining: boolean;

    @Output()
    trainigAssigned = new EventEmitter<Training>();

    constructor(private readonly trainingService: ITrainingsService, private readonly toastService: ToastService) {}

    ngOnInit(): void {}

    assignTraining() {
        delete this.training.isCreatedByAdmin;
        const result = this.trainingService.createTrainingWithExercises(this.training);
        if (!result) {
            this.toastService.error(`Cannot assign predefined training`);
            return;
        }

        this.trainigAssigned.emit(this.training);
    }

    showExercises() {}
}
