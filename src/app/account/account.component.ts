import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Customer} from '../_models/user';
import {UserService} from '../user.service';

import {TransactionService} from '../services/transaction.service';
import {Transaction} from '../_models/transaction';

import {AlertService} from '../services/alert.service';

import {Title} from '@angular/platform-browser';

import {
  NgForm,
  PatternValidator,
  FormGroup,
  FormBuilder,
  Validators,
  EmailValidator
} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isLogin: boolean;
  user: any = Customer;
  update: FormGroup;
  passwordUpdate: FormGroup;

  transactions: Transaction[];

  // transactions
  // need 4 values to be displayed on this page
  transactionDatePurchased: string;
  transactionStatus: string;
  transactionTotal: number;
  transactionDeliveryCode: string;


  constructor(private userService: UserService, private router: Router, private frmBuilder: FormBuilder,
  private transactionService: TransactionService, private alertService: AlertService, private titleService: Title) {

    this.transactions = [];
    this.titleService.setTitle('giftme - Account');

  }

  get firstName() {
    return this.update.get("firstName");
  }
  get lastName() {
    return this.update.get("lastName");
  }
  get mobileNumber() {
    return this.update.get("mobileNumber");
  }

  get password() {
    return this.passwordUpdate.get("password");
  }

  get verify() {
    return this.passwordUpdate.get("verify");
  }



  ngOnInit() {
    // Check if user is logged in
    // If user is not logged in, reroute to login

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
      this.user = JSON.parse(sessionStorage.getItem("user")).customer;

      console.log("this.user", this.user);

      this.update = this.frmBuilder.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        mobileNumber: [
          "",
          [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
        ]
      });


      this.passwordUpdate = this.frmBuilder.group({
        password: ["", [Validators.required]],
        verify: ["", [Validators.required]]
      });

      this.update.value.firstName = this.user.firstName;
      this.update.value.lastName = this.user.lastName;
      this.update.value.mobileNumber = this.user.mobileNumber;

      console.log("This.update", this.update);
      console.log("firstName", this.update.value.firstName);

      this.retrievePastTransactions();

    }

    if (!this.isLogin) {
      this.router.navigate(["/login"]);
    }

  }

  updateUser() {
    console.log("this.user", this.user);

    if (this.update.valid) {
    this.userService.updateUser(this.user).subscribe(
      response => {
        console.log("Success");
        // Need to update user on sessionStorage too..
        sessionStorage.setItem("user", JSON.stringify({"customer": this.user}));
        this.success("User profile updated successfully!");
      },
      error => {
        // this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      this.error("User profile not updated successfully");
      }
    );
    } else {
      this.error("User profile not updated successfully");
    }
  }

  updateUserPassword() {
    console.log("password update value", this.passwordUpdate.value);

    this.user.password = this.passwordUpdate.value.password;

    // takes in a customer object
    this.userService.updateUserPassword(this.user).subscribe(
      response => {
        console.log("password has been changed");
        this.success("Password has been changed successfully!");
      },
      error => {
        console.log("error");
        this.error("Password has not been successfully changed");
      }
    );
  }


  retrievePastTransactions() {
    // modify the email to fetch user's transactions
    let email = sessionStorage.getItem("username");
    this.transactionService.retrieveTransactions(email).subscribe(
      response => {
        console.log("retrieve past transactions", response);
        // response contains an array of objects
        // we will store the response in an array of Transactions

        for (var i = 0; i < response.transactions.length; i++) {
          let transaction = new Transaction();
          transaction.transactionDateTime = new Date(response.transactions[i].transactionDateTime);
          let transactionDateString = transaction.transactionDateTime.toString();
          transaction.transactionDatePurchased = transactionDateString.split(' ').slice(0, 4).join(' ');
          // ^ retrieves day (sun/mon), month, date, and year. manipulate slice method accordingly


          transaction.transactionDeliveryCode = response.transactions[i].delivery.deliveryCode;
          transaction.transactionStatus = response.transactions[i].delivery.deliveryStatus;
          transaction.transactionTotal = response.transactions[i].totalAmount;

          this.transactions[i] = transaction;

          console.log('this transactions', this.transactions);

        }

      }, error => {
        console.log(error);
      }
    );
  }

  saveTransactionData(transactionCode: number) {
    // saves current transaction code / delivery code / whatever into sessionStorage
    // ease of retrieving data using api
    // in the transaction page
    sessionStorage.setItem("transactionView", JSON.stringify(transactionCode));
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

}
