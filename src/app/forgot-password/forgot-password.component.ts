import { Component, OnInit } from '@angular/core';

import {UserService} from '../user.service';
import {AlertService} from '../services/alert.service';
import {Alert} from '../_models/alert';

import {NgForm} from '@angular/forms';

import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted = false;

  constructor(private userService: UserService,  private alertService: AlertService, private titleService: Title) { }

  ngOnInit() {
    this.email = "";

    this.titleService.setTitle('giftme - Forgot Password');
  }

  forgotPassword(forgotPw: NgForm) {

    this.isValidFormSubmitted = false;
    if (forgotPw.invalid) {
       return;
    } else {
      this.isValidFormSubmitted = true;
      this.userService.forgotUserPassword(this.email).subscribe(
        response => {
          // success
          this.success("Password reset message has been successfully sent to " + this.email);
        },
        error => {
          // error
          this.error(this.email + " is not a registered email");
        }
      );
    }
  }


success(message: string) {
    this.alertService.success(message);
}

error(message: string) {
    this.alertService.error(message);
}

}
