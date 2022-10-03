import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BPR_ADMIN_ACTIONS } from 'src/app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
    actions = BPR_ADMIN_ACTIONS;

    constructor(public ref: DynamicDialogRef) {}

    close(adminAction: BPR_ADMIN_ACTIONS): void {
        this.ref.close(adminAction);
    }
}