import {API_ERROR_CODES, BPR_ERROR_CODES} from '../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth/auth.service';
import {InfoService} from '../../services/api/info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
   signupForm: FormGroup;
   avatar: any;
   unauthorized: boolean;
 
  constructor(private router: Router, private authService: AuthService, private infoService: InfoService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(``, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl(``),
      lastName: new FormControl(``),
      age: new FormControl(``),
      height: new FormControl(``),
      weight: new FormControl(``),
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
  // if (this.signupForm.invalid) {
  //   return false;
  // }
  //   const login = this.signupForm.get(`email`).value;
  //   const password = this.signupForm.get(`password`).value;
  //   const firstName = this.signupForm.get(`firstName`).value;
  //   const lastName = this.signupForm.get(`lastName`).value;
  //   const age = this.signupForm.get(`age`).value;
  //   const  height= this.signupForm.get(`height`).value;
  //   const weight = this.signupForm.get(`weight`).value;
  //   const sex = this.signupForm.get(`sex`).value;
    
  //   const response = await this.authService.signup(email, password,firstName,lastName,age,height,weight,sex);


    
  const response = await this.authService.signup({
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      age:this.signupForm.get('age').value,
      height:this.signupForm.get('height').value,
      weight:this.signupForm.get('weight').value,
      sex:this.signupForm.get('sex').value,
      avatar: this.avatar,
  });

  if ((response as any)?.code === API_ERROR_CODES.notUniqueEmail) {
    this.infoService.error(`User with provided email already exists!`);
    return;
}

// if (response === BPR_ERROR_CODES.internal) {
//   this.infoService.error(`Cannot connect to the server. Try again later.`);
//   return;
// }

if (response?.id) {
    this.infoService.success(`Account has been successfully created!`);
    void this.router.navigateByUrl(`/login`);
    return;
}
this.infoService.error(`Cannot connect to the server. Try again later.`);

}
}
