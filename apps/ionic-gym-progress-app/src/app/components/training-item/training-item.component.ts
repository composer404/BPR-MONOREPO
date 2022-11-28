import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastService } from 'src/app/services/common/toast.service';
import { Training } from 'src/app/interfaces/interfaces';
import { TrainingService } from 'src/app/services/api/trainings.service';

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

    constructor(private readonly trainingService: TrainingService, private readonly toastService: ToastService) {}

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
