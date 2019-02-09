import { Component, OnInit } from '@angular/core';
import {RemoteCheckoutLineItem} from '../_models/RemoteCheckoutLineItem';
import { CartProduct } from '../_models/productincart';

import {TransactionService} from '../services/transaction.service';

import {CreditCardValidator} from 'ngx-credit-cards';

import {ActivatedRoute, Router} from '@angular/router';

import { AbstractControl, ValidatorFn } from '@angular/forms';

import {AlertService} from '../services/alert.service';

import {
  NgForm,
  PatternValidator,
  FormGroup,
  FormBuilder,
  Validators,
  EmailValidator
} from "@angular/forms";

import {CustomValidationService} from '../services/customValidationService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  remoteCheckoutLineItem: RemoteCheckoutLineItem;
  remoteCheckoutLineItems: RemoteCheckoutLineItem[];

  cart: CartProduct[];

  transactionForm: FormGroup;
  subtotal: number;

  isLogin: boolean;


  constructor(private transactionService: TransactionService,
    private frmBuilder: FormBuilder, private router: Router,
  public customValidationService: CustomValidationService,
  private alertService: AlertService) {
    this.isLogin = false;
    this.remoteCheckoutLineItems = new Array<RemoteCheckoutLineItem>();
    this.cart = new Array<CartProduct>();
  }

  get address() {
    return this.transactionForm.get('address');
  }

  get nameOnCard() {
    return this.transactionForm.get('nameOnCard');
  }

  get cardNumber() {
    return this.transactionForm.get('cardNumber');
  }

  get expiryMonth() {
    return this.transactionForm.get('expiryMonth');
  }

  get expiryYear() {
    return this.transactionForm.get('expiryYear');
  }

  get cvv() {
    return this.transactionForm.get('cvv');
  }

  ngOnInit() {

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    if (!this.isLogin) {
      this.router.navigate(["/login"]);
    }


      // initialise cart stuff to prepare for checkout
      this.cart = JSON.parse(sessionStorage.getItem("Cart"));
      console.log("this.cart", this.cart);

      this.transactionForm = this.frmBuilder.group({
      address: ["", [Validators.required]],
      nameOnCard: ["", [Validators.required]],
      cardNumber: ["", [Validators.required, this.checkLimit(1000000000000000, 9999999999999999)]],
      expiryMonth: ["", [Validators.required]],
      expiryYear: ["", [Validators.required]],
      cvv: ["", [Validators.required]]
      });

      // initialise subtotal from sessionstorage
      this.subtotal = JSON.parse(sessionStorage.getItem('subtotal'));
  }

  checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }

        console.log("******** inside checklimit ********");
        return null;

    };
  }

  sendTransaction() {
    // remember if person leaves this page halfway, need to clear storage for
    // for appropriate items
    // fetch required stuff from sessionStorage
    const remoteCheckoutLineItems = JSON.parse(sessionStorage.getItem("remoteCheckoutLineItems"));
    const shopAddress = sessionStorage.getItem("shopAddress");
    const promoCode = sessionStorage.getItem('promoCode');

    // retrieve customerAddress from input field
    const customerAddress = this.transactionForm.value.address;
    const email = sessionStorage.getItem("username");

    console.log("checkoutlineitems", remoteCheckoutLineItems);



    this.transactionService.createTransaction(remoteCheckoutLineItems, promoCode, email, customerAddress, shopAddress).subscribe(
      response => {
        console.log(response);

        // if successful, need to clear the sessionstorage of cart items, blabla
        sessionStorage.removeItem("Cart");
        sessionStorage.removeItem("promoCode");
        sessionStorage.removeItem("remoteCheckoutLineItems");
        sessionStorage.removeItem("shopAddress");
        sessionStorage.removeItem("subtotal");

        this.router.navigateByUrl('/success');

      },
      error => {
        console.log(error);
        this.error("Checkout not successful, please try again.");
      }
    );
  }

  error(message: string) {
    this.alertService.error(message);
  }



}


