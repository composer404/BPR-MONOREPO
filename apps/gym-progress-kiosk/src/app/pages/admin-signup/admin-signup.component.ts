// import * as environment from '../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { API_ERROR_CODES } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth/auth.service';
import { InfoService } from '../../services/info.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: `app-admin-signup-component`,
    templateUrl: `./admin-signup.component.html`,
    styleUrls: [`./admin-signup.component.scss`],
    providers: [InfoService]
})
export class AdminSignupComponent implements OnInit {
    signupForm: FormGroup;



    constructor(private router: Router, private authService: AuthService,private infoService:InfoService) {
      this.signupForm = new FormGroup({
        login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
        password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
        information: new FormControl(``),
      });
    }

    ngOnInit(): void {
    }


    public async onSignUp() {
        const response = await this.authService.signup({
            login: this.signupForm.get('login')?.value,
            password: this.signupForm.get('password')?.value,
            information: this.signupForm.get('information')?.value,
            gymId:environment.gymId,
        });
        
        if ((response as any)?.code === API_ERROR_CODES.notUniqueLogin) {
            this.infoService.error(`Admin with provided login already exists!`);
            return;
        }


        if (response?.id) {
            this.infoService.success(`Account has been successfully created!`);
            void this.router.navigateByUrl(`/login`);
            return;
        }
        this.infoService.error(`Cannot connect to the server. Try again later.`);
    }

}
