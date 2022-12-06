import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {

    constructor(

        public ref: DynamicDialogRef,
    )
    {}

    onClose(result: boolean): void {
        this.ref.close(result);
    }
}
