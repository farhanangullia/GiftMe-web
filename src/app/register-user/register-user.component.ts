import { Component, OnInit } from "@angular/core";
import {Title} from '@angular/platform-browser';

import {
  NgForm,
  PatternValidator,
  FormGroup,
  FormBuilder,
  Validators,
  EmailValidator
} from "@angular/forms";

import { Customer } from "../_models/user";
import { UserService } from "../user.service";
import { AlertService } from "../services/alert.service";
import { Alert } from "../_models/alert";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.css"]
})
export class RegisterUserComponent implements OnInit {
  msgs: any[] = [];
  submitted: boolean;
  newUser: any = Customer;
  registerErrorMessage: string;

  register: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;

  // mobnumPattern = "^((\\+91-?)|0)?[0-9]{8}$";
  // mobnumPattern = "([8,9])\d{7}";
  mobnumPattern = '/^[0-9]{8}$/';

  constructor(
    private userService: UserService,
    private frmBuilder: FormBuilder,
    private alertService: AlertService,
    private titleService: Title
  ) {
    this.submitted = false;

    this.newUser = new Customer();
  }

  get firstName() {
    return this.register.get("firstName");
  }
  get lastName() {
    return this.register.get("lastName");
  }
  get mobileNumber() {
    return this.register.get("mobileNumber");
  }
  get email() {
    return this.register.get("email");
  }
  get password() {
    return this.register.get("password");
  }
  get verify() {
    return this.register.get("verify");
  }

  ngOnInit() {
    this.titleService.setTitle('giftme - Sign up');

    this.register = this.frmBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      mobileNumber: [
        "",
        [Validators.required]
      ],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      verify: ["", [Validators.required]]
    });

    this.registerErrorMessage = "";
  }

  createUser() {
    this.submitted = true;
    delete this.register["verify"];

    console.log(this.register.value);

    if (this.register.valid) {
      this.msgs = [];

      this.userService.createNewUser(this.register.value).subscribe(
        response => {
          this.msgs.push({
            severity: "info",
            summary:
              "New customer " + response.customerId + " created successfully",
            detail: ""
          });
          this.success("You have been registered successfully!");
          console.log("Success");
        },
        error => {
          this.msgs.push({
            severity: "error",
            summary: "HTTP " + error.status,
            detail: error.error.message
          });
          this.error("You have not been registered successfully");
          console.log("error");
        }
      );
    } else {
      this.error(
        "The registration form has not been filled correctly, please try again"
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
