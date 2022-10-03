import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RatingModule } from 'primeng/rating';

// import { LanguagePipe } from '../pipes/language.pipe';



// import { SEPCommentItemComponent } from './comment-item/comment-item.component';
// import { SEPRatingItemComponent } from './rating-item/rating-item.component';
// import { SEPToplistCardComponent } from './toplist-card/toplist-card.component';

@NgModule({
    declarations: [

        ConfirmationModalComponent
    ],
    imports: [CommonModule, CardModule, RatingModule, FormsModule],
    exports: [
       
        ConfirmationModalComponent
    ],
})
export class BPRSharedModule {}
