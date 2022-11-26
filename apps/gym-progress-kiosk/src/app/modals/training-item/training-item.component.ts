import { Component, Input, OnInit } from '@angular/core';

import { Training } from 'src/app/interfaces/interfaces';

//import { SessionsService } from 'src/app/services/api/sessions.service';


@Component({
    selector: 'app-training-item',
    templateUrl: './training-item.component.html',
    styleUrls: ['./training-item.component.scss'],
})
export class TrainingItemComponent implements OnInit {
    @Input()
    training?: Training;

    @Input()
    activeTraining?: boolean;

    @Input()
    gymId?: string;

    participantsEventCallback: any;
  //  numberOfParticipants: number;

   // constructor(private readonly sessionsService: SessionsService) {}

    ngOnInit(): void {
        // if (this.activeTraining) {
        //     this.sessionsService.getGymNumberOfParticipants(this.gymId).then((data) => {
        //         this.numberOfParticipants = data;
        //     });
        // }
    }
}
