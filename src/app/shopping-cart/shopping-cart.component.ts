import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../_models/product';
import {PromotionService} from '../services/promotion.service';
import {AlertService} from '../services/alert.service';

import {RemoteCheckoutLineItem} from '../_models/RemoteCheckoutLineItem';

import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isLogin: boolean;
  msgs: any[] = [];
  submitted: boolean;
  products: any[] = [];
  subtotal: number;
  promoCode: string;
  discount: number;
  remoteCheckoutLineItems: any[] = [];

  constructor(private activatedRouter: ActivatedRoute, private router: Router,
    private promotionService: PromotionService, private alertService: AlertService,
  private titleService: Title) {
    this.isLogin = false;
    this.submitted = false;
    this.products = [];
    this.subtotal = 0;
    this.promoCode = "";
    this.discount = 0;

    this.remoteCheckoutLineItems = [];
  }

  ngOnInit() {
    this.titleService.setTitle('giftme - Shopping Cart');

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    if (!this.isLogin) {
      this.router.navigate(["/login"]);
    }

    // Check if sessionstorage has any products. If there are any products, place them inside this.products
    if (sessionStorage.getItem("Cart")) {
      // manually place in every item inside the array aka array[0], array[1] inside the this.products
      let sessionStorageItems = JSON.parse(sessionStorage.getItem("Cart"));
      console.log("sessionstorageitems", sessionStorageItems);

      for (var i = 0; i < sessionStorageItems.length; i++) {
        let currentItem = sessionStorageItems[i];
        this.products.push(currentItem);
      }

      console.log("Product", this.products[0]);
    }

    this.calculateCartSubtotal();

  }

  removeItem(productId: number) {
    // Need to know which item is being removed
    // eg pass in productId 1, then remove product id 1 from sessionstorage
    // need to remove from sessionStorage as well instead of just this.products
    //    console.log("productId ", productId);

    console.log("****** PRODUCT ID THAT WENT IN ******", productId);
    console.log("********* THIS PRODUCTS *********", this.products);

    // need to modify this.products too
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].product.productId === productId) {
        this.products.splice(i, 1); //remove 1 item at pos i
      }
    }

    let sessionStorageItems = JSON.parse(sessionStorage.getItem("Cart"));

    console.log('sessionstorageitems', sessionStorageItems);

    for (var j = 0; j < sessionStorageItems.length; j++) {
          console.log('sessionstorage[j]', sessionStorageItems[j]);
           console.log(sessionStorageItems[j].product.productId); // sessionStorageItems[j] is a json object

      if (sessionStorageItems[j].product.productId === productId) {
        sessionStorageItems.splice(j, 1);
        //          console.log("SessionStorageItems", sessionStorageItems);
        sessionStorage.setItem("Cart", JSON.stringify(sessionStorageItems));
      }
    }

    // Perform a check that if the cart is empty, then we delete the cart altogether
    if ("Cart" in sessionStorage) {
      // nothing
      console.log("*** There are still items in the cart ****");
      console.log("*** There's this inside ****", sessionStorage.getItem("Cart"));

      console.log("*** Length", sessionStorage.getItem("Cart").length);

      if (sessionStorage.getItem("Cart").length === 2) {
        sessionStorage.removeItem("Cart");
      }
    } else {
      sessionStorage.removeItem("Cart");
    }

        this.calculateCartSubtotal();
  }

  // Modify the quantity of the object in product page (Can use same method to modify object options like color etc)
  increaseQuantity(productId: number) {
    // Need to search for the correct product to add +1 product quantity

    // need to modify this.products too
    // have to do the same search in this.products?
//    console.log("Product id being passed into this function", productId);
//    console.log("this.products[i].productId", this.products[1];

    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].product.productId === productId) {
//        console.log("Increasing in this.products", this.products[i]);
        this.products[i].quantityInCart++;
      }
    }

    let sessionStorageItems = JSON.parse(sessionStorage.getItem("Cart"));

    for (var j = 0; j < sessionStorageItems.length; j++) {
      if (sessionStorageItems[j].product.productId === productId) {
        console.log("Decreasing this:", sessionStorageItems[j]);
        sessionStorageItems[j].quantityInCart++;
        sessionStorage.setItem("Cart", JSON.stringify(sessionStorageItems));
      }
    }

        this.calculateCartSubtotal();
  }

  // Do not allow person to decrease the quantity to below 1
    decreaseQuantity(productId: number) {
         for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].product.productId === productId) {
//        console.log("Increasing in this.products", this.products[i]);
        if (this.products[i].quantityInCart <= 1) {
          console.log("this.products[i] in decrease quantity", this.products[i].quantityInCart);
          // cannot decrease anymore
        } else if (this.products[i].quantityInCart > 1) {
        this.products[i].quantityInCart--;
        this.calculateCartSubtotal();
        }
      }
    }


    let sessionStorageItems = JSON.parse(sessionStorage.getItem("Cart"));

    for (var j = 0; j < sessionStorageItems.length; j++) {
      if (sessionStorageItems[j].product.productId === productId) {

        if (this.products[i].quantityInCart <= 1) {
          // dont do anything
        } else {
        console.log("Decreasing this:", sessionStorageItems[j]);
        sessionStorageItems[j].quantityInCart--;
        sessionStorage.setItem("Cart", JSON.stringify(sessionStorageItems));
        }
      }
    }

          this.calculateCartSubtotal();
  }


  calculateCartSubtotal() {
    // for each product in cart
    // product price multiply by quantity in cart
    // todo: needs to update when sessionStorage updates
    let subtotal = 0;

    console.log("inside subtotal", this.products);

    for (var i = 0; i < this.products.length; i++) {
      let currentProduct = this.products[i];

      console.log(currentProduct);
      subtotal += currentProduct.product.price * currentProduct.quantityInCart;

      console.log("SUBTOTAL", subtotal);
      this.subtotal = subtotal;
    }

    this.subtotal -= this.discount;
  }

  applyPromo(promoCode: string) {
    this.promotionService.retrievePromotionByCode(promoCode).subscribe(
      response => {
        // console.log(response);
        this.discount = response.promotion.discount;
        this.calculateCartSubtotal();
        this.success(promoCode + " has been applied for a discount of $" + this.discount);
        this.msgs.push({severity: "info", summary: "Product loaded successfully", detail: ""});


      },
      error => {
        // console.log(error);
        this.discount = 0;
        this.error("Oops, this code is not valid. Please try again");
        this.calculateCartSubtotal();
        this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      }
    );
  }

  removePromo() {
    this.promoCode = "";
    this.discount = 0;
    this.calculateCartSubtotal();
    this.alertService.clear();
  }



  success(message: string) {
    this.alertService.success(message);
}

error(message: string) {
    this.alertService.error(message);
}

clickCheckout() {
  // store remote line item
  console.log("this.products, clickCheckout()", this.products);
  // iterate through this.products
  // store current products inside as objects

  for (var i = 0; i < this.products.length; i++) {
    let item = new RemoteCheckoutLineItem();
    item.skuCode = this.products[i].product.skuCode;
    item.quantity = this.products[i].quantityInCart;

    console.log("Item in loop", item);

    let remoteCheckoutLineItem = new Object();
    remoteCheckoutLineItem = {skuCode: item.skuCode, quantity: item.quantity};

    let bigObj = {remoteCheckoutLineItem: remoteCheckoutLineItem};


    this.remoteCheckoutLineItems.push(bigObj);

    // navigate to checkout
    this.router.navigateByUrl('/checkout');

  }


  console.log(this.remoteCheckoutLineItems);
  sessionStorage.setItem("remoteCheckoutLineItems", JSON.stringify(this.remoteCheckoutLineItems));

  // store promo code
  sessionStorage.setItem("promoCode", this.promoCode);

  // shop address - take from cart[0].product.shop.location
  const shopAddress = JSON.parse(sessionStorage.getItem("Cart"))[0].product.shop.location;
  sessionStorage.setItem("shopAddress", shopAddress);

  // customer address - will be passed in the next page

  // store subtotal for display on the next page
  sessionStorage.setItem("subtotal", JSON.stringify(this.subtotal));

}






}
