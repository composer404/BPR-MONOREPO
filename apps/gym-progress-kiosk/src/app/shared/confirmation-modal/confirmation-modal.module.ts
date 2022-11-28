import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ConfirmationModalComponent,
    ],
    imports: [CommonModule, CardModule, FormsModule],
    exports: [
        ConfirmationModalComponent
    ],
})
export class ConfirmationModalModule {}
