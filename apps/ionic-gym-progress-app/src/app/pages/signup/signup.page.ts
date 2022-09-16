import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { API_ERROR_CODES } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/common/toast.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    signupForm: FormGroup;
    avatar: any;
    age: number;
    height: number;
    weight: number;
    unauthorized: boolean;
    numberRegEx = /\-?\d*\.?\d{1,2}/;

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
            email: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            firstName: new FormControl(``),
            lastName: new FormControl(``),
            age: new FormControl(``, [Validators.required, Validators.pattern(this.numberRegEx)]),
            height: new FormControl(``, [Validators.required, Validators.pattern(this.numberRegEx)]),
            weight: new FormControl(``, [Validators.required, Validators.pattern(this.numberRegEx)]),
            sex: new FormControl(``),
        });
    }

    selectFile(event: any) {
        const mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
            this.avatar = reader.result;
        };
    }

    async onSignUp() {
        const response = await this.authService.signup({
            email: this.signupForm.get('email').value,
            password: this.signupForm.get('password').value,
            firstName: this.signupForm.get('firstName').value,
            lastName: this.signupForm.get('lastName').value,
            age: parseInt(this.signupForm.get('age').value, 10),
            height: parseFloat(this.signupForm.get('height').value),
            weight: parseFloat(this.signupForm.get('weight').value),
            sex: this.signupForm.get('sex').value,
            avatar: this.avatar,
        });

        if ((response as any)?.code === API_ERROR_CODES.notUniqueEmail) {
            await this.toastService.error(`Selected email is used in the system`);
            return;
        }

        if (response?.id) {
            this.toastService.success(`Account succesfully created`);
            void this.router.navigateByUrl(`/login`);
        }
    }

    hideErrorMessage() {
        if (this.unauthorized) {
            this.unauthorized = false;
        }
    }
}
