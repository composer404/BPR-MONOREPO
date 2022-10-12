import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise, Training } from '../../interfaces/interfaces';
import { ExerciseService } from '../../services/api/exercise.service';
import {TrainingService} from '../../services/api/trainings.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.page.html',
  styleUrls: ['./training-details.page.scss'],
})

export class TrainingDetailsPage implements OnInit {

  form: FormGroup;
  exercises: Exercise[];
  selectedTraining: Training;
  trainingId: string;

  constructor(private route: ActivatedRoute,
              private readonly exerciseService: ExerciseService,
              private readonly trainingService: TrainingService) {
    this.trainingId = this.route.snapshot.params.id;
    this.form = new FormGroup({
      title: new FormControl(``, [Validators.required]),
      description: new FormControl(``),
      exercise_type: new FormControl(``),
      muscle_group: new FormControl(``),
      quantity: new FormControl(``),
    });
  }

  ngOnInit(): void {
    void this.loadTrainingData();
  }

  loadTrainingData() {
    this.trainingService.getTrainingById(this.trainingId).subscribe((training) => {
      this.form = new FormGroup({
        title: new FormControl(training.title),
        type: new FormControl(training.type),
        description: new FormControl(training.description),
        comment: new FormControl(training.comment),
      });
    });
  }

  async onTrainingSelected(training: Training) {
    this.selectedTraining = training;
    this.exercises = await this.exerciseService.getExercisesForTrainings(this.selectedTraining.id);
  }
}
