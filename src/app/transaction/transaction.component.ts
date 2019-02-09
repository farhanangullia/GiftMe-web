import { Component, OnInit } from '@angular/core';
import {Transaction} from '../_models/transaction';

import {TransactionService} from '../services/transaction.service';
import {Product} from '../_models/product';

import {ActivatedRoute, Router} from '@angular/router';

import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionDeliveryCode: string;

  // to store transactionLineItems
  products: Product[];

  // fields needed to display for this page:
  // sku code, product name, quantity, subtotal

  // address
  address: string;
  // subtotal

  // discount
  discount: number;
  // total
  totalAmount: number;

  subtotal: number;

  isLogin: boolean;

  constructor(private transactionService: TransactionService, private router: Router, private titleService: Title) {
    this.products = [];
    this.isLogin = false;
  }

  ngOnInit() {


    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    if (!this.isLogin) {
      this.router.navigate(["/login"]);
    }

    // load data from sessionStorage
    this.transactionDeliveryCode = JSON.parse(sessionStorage.getItem("transactionView"));
    console.log("Transaction Delivery Code", this.transactionDeliveryCode);

    this.retrieveTransactionData();
  }

  retrieveTransactionData() {
    this.transactionService.retrieveTransactionByDeliveryCode(this.transactionDeliveryCode).subscribe(
      response => {
        // response will contain a transaction object
        // that contains customer object, delivery object, transactionLineItems array

        console.log("response", response);

        this.address = response.transaction.delivery.customerAddress;
        this.discount = response.transaction.discount;
        this.totalAmount = response.transaction.totalAmount;

        console.log("this address", this.address);
        console.log("this.discount", this.discount);
        console.log("this.totalamount", this.totalAmount);

        // store transactionlineitems under products
        let transactionLineItems = response.transaction.transactionLineItems;

        for (var i = 0; i < transactionLineItems.length; i++) {
          this.products[i] = transactionLineItems[i];
        }

        this.subtotal = this.discount + this.totalAmount;

        this.titleService.setTitle('giftme - Transaction #' + this.transactionDeliveryCode);

      }, error => {

      }
    );
  }

  backButton() {
    // work around on browser
    window.location.href = '/account';
  }

}
