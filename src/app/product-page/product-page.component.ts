import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import {Product} from '../_models/product';
import {CartProduct} from '../_models/productincart';
import {ProductService} from '../product.service';
import {AlertService} from '../services/alert.service';
import {Alert} from '../_models/alert';

import {UpdateCartService} from '../services/updateCart.service';

import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  productId: number;
  productToView: any = Product;
  productToAddToCart: CartProduct;
  tempSessionStorage = [];

  msgs: any[] = [];

  // display for primeng popup
  display: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private alertService: AlertService,
    private router: Router, private updateCartService: UpdateCartService, private titleService: Title) {

    this.productToAddToCart = new CartProduct();
    this.productToView = new Product();

    // call component with number of items in cart
    setTimeout(() => {
      if (sessionStorage.getItem("Cart")) {
        let cart = JSON.parse(sessionStorage.getItem("Cart"));
        this.updateCartService.callComponent(cart.length);
        console.log("**** cart.length updated from productpage ****");

      // emit event
      // let cart = JSON.parse(sessionStorage.getItem("Cart"));
      // this.updateCartService.invokeEvent.next(cart.length);
      }
    });

  }

  ngOnInit() {

    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));

    this.productService.getProductByProductId(this.productId).subscribe(
      response => {
        this.productToView = response.product;
        //        console.log(this.productToView);
        this.msgs.push({severity: "info", summary: "Product loaded successfully", detail: ""});

        this.productToAddToCart.product = this.productToView;
        this.productToAddToCart.quantityInCart = 1;

        // default quantity of productToAddToCart is 1.

        this.titleService.setTitle('giftme - ' + this.productToView.productName);

      },
      error => {
        this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      }
    );
  }


  addToCart() {
    // 1. retrieve existing sessionStorage.cart first
    // 2. place existing sessionStorage into an array through json.parse
    // Need to check if there is any item with the same name inside the cart already
    // If there is an item with the same name, add quantity instead

    // Need to check quantityonhand too. If there's too little quantity
    // then console.log and prevent the action -> Show a message!

    // we have to calculate hypothetically, if we already had the item in cart,
    // can we still add in anymore of this item?


    // how many items does this fella wanna add?

    if (sessionStorage.getItem("isLogin") != null) {

          // Cart doesn't exist => Create Cart
          // even while creating cart,
          // we need to ensure that the quantity does not exceed
          // the quantity on hand

          // retrieve the current quantityonhand of the product in stock
          // compare to the quantity that you'd want to add

    if (this.productToAddToCart.quantityInCart === null) {
      this.productToAddToCart.quantityInCart = 1;
    }

    if (this.productToView.quantityOnHand >= this.productToAddToCart.quantityInCart) {
    if (sessionStorage.getItem("Cart") === null) {
      this.tempSessionStorage[0] = this.productToAddToCart;
      sessionStorage.setItem("Cart", JSON.stringify(this.tempSessionStorage));
      this.success("Product has been added into cart");

      // emit event
      let cartAgain = JSON.parse(sessionStorage.getItem("Cart"));
      this.updateCartService.invokeEvent.next(cartAgain.length);
      console.log("*** Cart Event ****", cartAgain);

    } else {


      console.log("This.productToView", this.productToView.shop.shopId);
      console.log("cart", JSON.parse(sessionStorage.getItem("Cart"))[0]);
      if (this.productToView.shop.shopId === JSON.parse(sessionStorage.getItem("Cart"))[0].product.shop.shopId) {
      this.retrieveCart();
      } else {
        this.error("Products can only be added from same shop!");
        this.display = true;
      }
    }
  } else {
    this.error("Product was not successfully added in cart - Not enough stock");
  }

  } else {
    // not logged in, redirect to login page
    //this.router.navigateByUrl("/login");

      window.location.href = '/login';
  }

  }

  retrieveCart() {
    let cartTooFull = false;

      // Cart already exists, retrieve the cart
      this.tempSessionStorage = (JSON.parse(sessionStorage.getItem("Cart"))); //1. and 2.
//        console.log("Retrieved cart", tempSessionStorage);
//        console.log("temsessionstorage[0]", tempSessionStorage[0].product);

let imaginaryCartQuantity = (JSON.parse(sessionStorage.getItem("Cart")));
console.log("Product to add to cart's quantity", this.productToAddToCart.quantityInCart);
console.log("Imaginary cart quantity", imaginaryCartQuantity);
// need to access the correct imaginary cart

for (var j = 0; j < imaginaryCartQuantity.length; j++) {
if (imaginaryCartQuantity[j].product.skuCode === this.productToAddToCart.product.skuCode) {
  imaginaryCartQuantity = imaginaryCartQuantity[j];
  break;
}
}

if ((imaginaryCartQuantity.quantityInCart + this.productToAddToCart.quantityInCart) > this.productToView.quantityOnHand) {
console.log("Cannot add anymore, not enough product in stock");
this.error("Product was not successfully added in cart - Not enough stock");
cartTooFull = true;
} else  if (cartTooFull === false) {

      let sameProductAdded = false;

      // check if this.productToView exists inside the array already
      // if it does, then ADD QUANTITY of productToView
      for (var i = 0; i < this.tempSessionStorage.length; i++) {

        if (this.productToAddToCart.product.skuCode === this.tempSessionStorage[i].product.skuCode) {
          // Product match
          let extraQty = this.productToAddToCart.quantityInCart;
//            console.log("Extra qty", extraQty);
//            console.log("Tempsession quantity", tempSessionStorage[i].quantityInCart);

          let tempQty = 0;
          tempQty = this.productToAddToCart.quantityInCart;
          this.tempSessionStorage[i].quantityInCart += this.productToAddToCart.quantityInCart;
//            console.log("Temp session storage new quantity", tempSessionStorage[i].quantityInCart);

          //Override?
          sessionStorage.setItem("Cart", JSON.stringify(this.tempSessionStorage));

          sameProductAdded = true;
        }
      }

      if (!sameProductAdded) {
        this.tempSessionStorage.push(this.productToAddToCart);
        sessionStorage.setItem("Cart", JSON.stringify(this.tempSessionStorage));
      }

      this.success("Product has been added into cart");
    }

  }

  // Modify the quantity of the object in product page (Can use same method to modify object options like color etc)
  increaseQuantity() {
    if ((Number.isInteger(this.productToAddToCart.quantityInCart)) === false) {
      // don't do anything
    } else {
    this.productToAddToCart.quantityInCart++;
    }
  }

  decreaseQuantity() {
    if ((Number.isInteger(this.productToAddToCart.quantityInCart)) === false) {
      // don't do anything
    } else {

    if (this.productToAddToCart.quantityInCart !== 1) {
      this.productToAddToCart.quantityInCart--;
    }

    }
  }

  success(message: string) {
    this.alertService.success(message);
}

error(message: string) {
    this.alertService.error(message);
}

goToShop(shopId: number) {
  console.log("shopId in goToShop", shopId);
  window.location.href = "/shop/" + shopId;
}

goToCategory(category: string) {
  let path = "";
  switch (category) {
    case "Confectionary":
        path = "confectionery";
        break;
    case "Plushies":
        path = "plushies";
        break;
    case "Flowers":
        path = "flowers";
        break;
    default:
        path = "home";
  }
  window.location.href = "/category/" + path;
}

clearCart() {
  sessionStorage.removeItem("Cart");
  this.display = false;

  // also add current item
  this.addToCart();
}



}

