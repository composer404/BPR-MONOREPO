import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BPR_ERROR_CODES } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth/auth.service';
import { InfoService } from '../../services/info.service';
import { Router } from '@angular/router';

@Component({
    selector: `app-admin-login-component`,
    templateUrl: `./admin-login.component.html`,
    styleUrls: [`./admin-login.component.scss`],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  unauthorized: boolean;

  constructor(private router: Router, private authService: AuthService, private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const login = this.loginForm.get(`login`).value;
    const password = this.loginForm.get(`password`).value;
    const response = await this.authService.login(login, password);

    if (response === BPR_ERROR_CODES.unauthorized) {
      this.unauthorized = true;
      return;
    }

    if (response === BPR_ERROR_CODES.internal) {
      this.infoService.error(`Cannot connect to the server. Try again later.`);
      return;
    }

    const profile = await this.authService.getProfile();
    this.router.navigateByUrl(`/profile/${profile.id}`);
  }

  hideErrorMessage() {
    if (this.unauthorized) {
      this.unauthorized = false;
    }
  }
}
