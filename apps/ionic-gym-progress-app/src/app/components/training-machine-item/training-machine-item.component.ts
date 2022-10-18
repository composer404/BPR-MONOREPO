import {Component, Input, OnInit} from '@angular/core';
import {TrainingMachine} from '../../interfaces/interfaces';
import {AvailibilityType} from '../../models/enums/availibility-type';

@Component({
  selector: 'app-training-machine-item',
  templateUrl: './training-machine-item.component.html',
  styleUrls: ['./training-machine-item.component.scss'],
})
export class TrainingMachineItemComponent implements OnInit {

  @Input()
  trainingMachines: TrainingMachine;

  availability: TrainingMachine;
  public Availability = AvailibilityType;

  constructor() { }

  ngOnInit() {}

}
