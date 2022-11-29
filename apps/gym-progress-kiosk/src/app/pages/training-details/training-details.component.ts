import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exercise, ModalCloseResult, Training, TrainingMachines } from '../../interfaces/interfaces';

import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CreateExerciseModalComponent } from 'src/app/modals/create-exercise-modal/create-exercise-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditExerciseModalComponent } from 'src/app/modals/edit-exercise-modal/edit-exercise-modal.component';
import { ExerciseService } from '../../services/exercise.service';
import { InfoService } from '../../services/info.service';
import { Subscription } from 'rxjs';
import { TrainingMachinesService } from 'src/app/services/training-machines.service';
import { TrainingService } from 'src/app/services/training.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.component.html',
    styleUrls: ['./training-details.component.scss'],
})
export class TrainingDetailsComponent implements OnInit {
    exercises: Exercise[] = [];
    trainingMachines: TrainingMachines[] = [];
   // training?:Training;

    selectedTraining?: Training[];
    // profileId: string;
     trainingId?: string;
    subscriptions: Subscription[] = [];

    constructor(
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingMachinesService: TrainingMachinesService,
        private readonly infoService: InfoService,
        private readonly dialogService: DialogService,
        public config: DynamicDialogConfig,
    ) {
        // this.profileId = this.route.snapshot.params.id;
        // this.trainingId = this.route.snapshot.params.trainingId;
        // this.gymId = this.route.snapshot.params.gymId;
    }

    ngOnInit(): void {
        // this.loadTrainingData();
       //  this.loadExercises();
        this.loadTrainingMachines();
    }
    ngOnDestroy(): void {
        this.subscriptions?.forEach((sub) => {
            sub.unsubscribe();
        });
    }
    openCreateModal(trainingId:string) {
        console.log(trainingId)
        const ref = this.dialogService.open(CreateExerciseModalComponent, {
            header: `Add new exercise`,
            width: `40%`,
            data:{
                trainingId,
            }
        });

        this.subscriptions.push(
            ref.onClose.subscribe(() => {
                this.loadExercises();
            }),
        );
    }
    async removeExerciseFromTraining(exercise: Exercise) {
        const ref = this.dialogService.open(ConfirmationModalComponent, {
            header: `Confirm action`,
            width: `40%`,
        });

        this.subscriptions.push(
            ref.onClose.subscribe(async (result) => {
                if (result) {
                    const response = await this.exerciseService.deleteExercise(exercise.id);
                    if (response) {
                        this.infoService.success(`Exercise has been successfully deleted`);
                        this.removeExerciseLocally(exercise.id);
                        return;
                    }
                    this.infoService.success(`Cannot delete exercise. Try again later.`);
                }
            }),
        );
    }
    openEditExerciseModal(exercise: Exercise) {
        this.dialogService.open(EditExerciseModalComponent, {
            width: `40%`,
            data: {
                ...exercise,
            },
        });
    }


//    private async loadTrainingData() {
//         const result = await this.trainingService.getTrainingById(this.trainingId);
//         if (!result) {
//             this.infoService.error(`Cannot load selected training. Try again later.`);
//             return;
//         }
//         if(result){
//         this.selectedTraining= result;
//         }
//     }

  private async  loadExercises(){
     this.exercises =await this.exerciseService.getExercisesForTrainings(this.trainingId);
    }
    
    private async loadTrainingMachines(){
        this.trainingMachines = await this.trainingMachinesService.getTrainingMachinesForGym();
      }

      private removeExerciseLocally(exerciseId: string) {
        this.exercises = this.exercises.filter((element) => {
            return element.id !== exerciseId;
        });
    }
}
    


