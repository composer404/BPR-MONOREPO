import { API_ERROR_CODES, BPR_ERROR_CODES } from '../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { InfoService } from '../../services/common/info.service';
import { ToastService } from 'src/app/services/common/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    unauthorized: boolean;

    constructor(private router: Router, private authService: AuthService, private infoService: InfoService,
                private toastService: ToastService) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
            password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
        });
    }

    async onLogin() {
        if (this.loginForm.invalid) {
            return false;
        }

        const login = this.loginForm.get(`login`).value;
        const password = this.loginForm.get(`password`).value;
        const response = await this.authService.login(login, password);

        if ((response as any)?.code === API_ERROR_CODES.notUniqueEmail) {
          await this.toastService.error(`Unauthorized`);
          return;
        }

        if (response === BPR_ERROR_CODES.internal) {
            await this.toastService.error(`Cannot connect to the server. Try again later`);
            this.infoService.error(`Cannot connect to the server. Try again later.`);
            return;
        }

        const profile = await this.authService.getProfile();
        this.router.navigateByUrl(`/profile/${profile.id}`);
    }

    onClickSignUp(): void {
        this.router.navigate(['signup']);
    }

    hideErrorMessage() {
        if (this.unauthorized) {
            this.unauthorized = false;
        }
    }
}
