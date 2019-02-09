import { Component, OnInit, OnChanges, AfterViewInit, EventEmitter, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
declare let $: any;


import {UpdateCartService} from '../services/updateCart.service';
import { ProductPageComponent } from '../product-page/product-page.component';

@Component({
  providers: [ProductPageComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  cartBadge: number;

  isLoggedIn: boolean;

  isIn = false;   // store state

  public myValue: number = 2;

  // store array of states that we want the toggle to be
  mobileMenuToggle = ["mobile-menu-toggle"];
  mobileMenuWrapper = ["mobile-menu-wrapper"];

  constructor(private comp: ProductPageComponent, private updateCartService: UpdateCartService) {
    this.cartBadge = 0; // init value of cartbadge is zero
    // this.updateCartService.invokeEvent.subscribe(value => this.cartBadge = value);
  }

  ngOnInit() {
    if (sessionStorage.getItem("Cart")) {
      let cart = JSON.parse(sessionStorage.getItem("Cart"));

      this.cartBadge = cart.length;
    }

    if (sessionStorage.getItem("isLogin")) {
      this.isLoggedIn = true;
    }

    // this.updateCartService.invokeEvent.subscribe((val) => {
    //   this.cartBadge = val;
    // });
  }

  // ngOnChanges(...args: any[]) {
  //   this.updateCartService.invokeEvent.subscribe(value => this.cartBadge = value);
  // }

  // click handlers for router links that do not work
  plushiesButton() {
    // work around on browser
    window.location.href = '/category/plushies';
  }

  flowersButton() {
    window.location.href = '/category/flowers';
  }

  confectioneryButton() {
    window.location.href = '/category/confectionery';
  }

  accountButton() {
    window.location.href = '/account';
  }

  cartButton() {
    window.location.href = '/cart';
  }

  loginButton() {
    window.location.href = '/login';
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("Cart");
    sessionStorage.removeItem("transactionView");
    sessionStorage.removeItem("promoCode");
    sessionStorage.removeItem("remoteCheckoutLineItems");
    sessionStorage.removeItem("shopAddress");
    sessionStorage.removeItem("subtotal");

    window.location.href = "/home";
  }

  toggleState() { // click handler
    if (this.isIn === false) {
      this.mobileMenuToggle = ["mobile-menu-toggle active"];
      this.mobileMenuWrapper = ["mobile-menu-wrapper open"];
      this.isIn = true;
    } else {
      // console.log("Mobile menu is opened");
      this.isIn = false;
      this.mobileMenuToggle = ["mobile-menu-toggle"];
      this.mobileMenuWrapper = ["mobile-menu-wrapper"];
    }
  }

  myValueChange(event) {
    console.log(event);
  }

}
