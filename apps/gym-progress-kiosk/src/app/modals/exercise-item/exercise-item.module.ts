import { CommonModule } from '@angular/common';
import { CreateExerciseModalModule } from 'src/app/modals/create-exercise-modal/create-exercise-modal.module';
import { DialogModule } from 'primeng/dialog';
import { ExerciseItemComponent } from './exercise-item.component';
import { NgModule } from '@angular/core';

//import { IonicModule } from '@ionic/angular';


@NgModule({
    imports: [CommonModule,CreateExerciseModalModule,DialogModule],
    declarations: [ExerciseItemComponent],
    exports: [ExerciseItemComponent],
})
export class ExerciseItemModule {}
