import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-transaction-successful',
  templateUrl: './transaction-successful.component.html',
  styleUrls: ['./transaction-successful.component.css']
})
export class TransactionSuccessfulComponent implements OnInit {

  isLogin: boolean;

  constructor(private router: Router, private titleService: Title) {
    this.isLogin = false;
   }

  ngOnInit() {
    this.titleService.setTitle('giftme - Transaction Successful');

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    if (!this.isLogin) {
      this.router.navigate(["/login"]);
    }
  }

}
