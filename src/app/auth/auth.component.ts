import {Component, OnInit, NgZone} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Customer} from '../_models/user';
import {UserService} from '../user.service';

import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

import {Title} from '@angular/platform-browser';

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})

export class AuthComponent implements OnInit {
  isLogin: boolean;
  firstName: string;
  lastName: string;
  submitted: boolean;
  username: string;
  password: string;
  loginErrorMessage: string;



  constructor(private zone: NgZone, private userService: UserService, private router: Router,
  private alertService: AlertService, private titleService: Title) {
    this.isLogin = false;
    this.firstName = "";
    this.lastName = "";
    this.submitted = false;
    this.username = "";
    this.password = "";
    this.loginErrorMessage = null;

}



  ngOnInit() {
    this.titleService.setTitle('giftme - Login');

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    console.log(this.router);
    // console.log(this.navigationEnd);

  }


  clear() {
    this.username = "";
    this.password = "";
  }



  login(loginForm: NgForm) {
    console.log("LoginComponent.login()");
    console.log("isLogin", this.isLogin);

    this.submitted = true;

    if (loginForm.valid) {

      this.userService.getUser(this.username, this.password).subscribe(
        response => {
          console.log("Logged in successfully as " + this.username);
          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("user", JSON.stringify(response));
          sessionStorage.setItem("isLogin", "true");
          this.isLogin = true;

          // this.success("You have logged in!");

          window.location.href = '/home';
        }, error => {
          this.error("Invalid username/password, please try again");
        }
      );


      //        window.location.reload();
    } else {
      this.loginErrorMessage = "Invalid login credential";
      this.error("Invalid username/password, please try again");
    }
  }



  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("Cart");

    window.location.reload();

  }

  success(message: string) {
    this.alertService.success(message);
}

error(message: string) {
    this.alertService.error(message);
}
}

