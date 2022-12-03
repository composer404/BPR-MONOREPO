import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gym, TrainingMachine} from '../../interfaces/interfaces';

import {Router} from '@angular/router';
import {TrainingMachineService} from '../../services/api/training-machine.service';

@Component({
  selector: 'app-training-machine-details',
  templateUrl: './training-machine-details.page.html',
  styleUrls: ['./training-machine-details.page.scss'],
})
export class TrainingMachineDetailsPage implements OnInit {

  trainingMachineForm: FormGroup;
  trainingMachines: TrainingMachine[];
  selectedGym: Gym;
  trainingMachineId: string;

  constructor(private router: Router,
              private readonly trainingMachineService: TrainingMachineService) {
    this.trainingMachineForm = new FormGroup({
      name: new FormControl(``, [Validators.required]),
      description: new FormControl(``),
      location: new FormControl(``),
      availability: new FormControl(``),
      class: new FormControl(``),
    });
  }

  ngOnInit() {
    void this.loadTrainingMachineData();
  }

  loadTrainingMachineData() {
    this.trainingMachineService.getTrainingMachineById(this.trainingMachineId).subscribe((trainingMachine) => {
      this.trainingMachineForm = new FormGroup({
        name: new FormControl(trainingMachine.name),
        description: new FormControl(trainingMachine.description),
        location: new FormControl(trainingMachine.location),
        availability: new FormControl(trainingMachine.availability),
        class: new FormControl(trainingMachine.class),
      });
    });
  }

  async onTrainingMachineSelected(gym: Gym) {
    this.selectedGym = gym;
    this.trainingMachines = await this.trainingMachineService.getTrainingMachinesForGym(this.selectedGym.id);
  }
}
