import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Exercise, Training } from 'src/app/interfaces/interfaces';

import { IonModal } from '@ionic/angular';

@Component({
    selector: 'app-exercises-modal',
    templateUrl: './exercises-modal.component.html',
    styleUrls: ['./exercises-modal.component.scss'],
})
export class ExercisesModalComponent {
    @ViewChild(IonModal) ionModal: IonModal;

    @Input() buttonTemplate: TemplateRef<any>;

    @Input()
    title: string;

    @Input()
    exercises: Exercise[];

    @Input()
    id: string;

    onClose() {
        this.ionModal.dismiss(null, `cancel`);
    }
}
