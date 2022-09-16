import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: `app-welcome-component`,
    templateUrl: `./welcome.component.html`,
    styleUrls: [`./welcome.component.scss`],
})
export class WelcomeComponent {
    gymId: string;

    constructor() {
        this.gymId = environment.gymId;
    }
}
