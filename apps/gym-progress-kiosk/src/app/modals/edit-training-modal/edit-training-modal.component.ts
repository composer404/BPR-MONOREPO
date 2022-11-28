import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InfoService } from 'src/app/services/info.service';
import { Training } from 'src/app/interfaces/interfaces';
import { TrainingService } from 'src/app/services/training.service';

@Component({
    selector: 'app-edit-training-modal',
    templateUrl: './edit-training-modal.component.html',
    styleUrls: ['./edit-training-modal.component.scss'],
})

export class EditTrainingModalComponent implements OnInit {
    editTrainingForm: FormGroup;
    training: Training;
    constructor(
        private readonly infoService: InfoService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private readonly trainingService: TrainingService,
    ) {
        this.training = this.config.data;
        this.editTrainingForm = new FormGroup({
            title: new FormControl(``, [Validators.required]),
            type: new FormControl(``,[Validators.required]),
            description: new FormControl(``),
            comment:new FormControl(``),
        });
}
ngOnInit(): void {
    this.training = this.config.data;
    this.editTrainingForm.patchValue({
            title: this.training.title,
            type:this.training.type,
            description: this.training.description,
            comment:this.training.comment
    });
}

async onSave() {
    const body = {
        title: this.editTrainingForm.get('title')?.value,
        type: this.editTrainingForm.get('type')?.value,
        description: this.editTrainingForm.get('description')?.value,
        comment: this.editTrainingForm.get('comment')?.value,
    };
    const response = this.trainingService.editTraining(this.training.id, body);

    if (!response) {
        this.infoService.error(`Training update failed. Try again later`);
        return;
    }
    this.infoService.success(`Training has been successfully updated`);
    this.ref.close();
}


close(): void {
    this.ref.close();
}
}