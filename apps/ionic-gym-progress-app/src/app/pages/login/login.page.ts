import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  unauthorized: boolean;

  constructor() { }

  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
    //   password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
    // });
  }

  // async onLogin() {
  //   if (this.loginForm.invalid) {
  //     return false;
  //   }
  //
  //   const login = this.loginForm.get(`login`).value;
  //   const password = this.loginForm.get(`password`).value;
  //   const response = await this.authService.login(login, password);
  //
    // if (response === SEP_ERROR_CODES.unauthorized) {
    //   this.unauthorized = true;
    //   return;
    // }

    // if (response === SEP_ERROR_CODES.internal) {
    //   this.infoService.error(`Cannot connect to the server. Try again later.`);
    //   return;
    // }

    // const profile = await this.authService.getProfile();
    // this.router.navigateByUrl(`/profile/${profile.id}`);
  // }
  //
  // hideErrorMessage() {
  //   if (this.unauthorized) {
  //     this.unauthorized = false;
  //   }
  // }
}
