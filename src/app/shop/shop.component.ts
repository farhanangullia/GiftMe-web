import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Shop } from '../_models/shop';
import {ShopService} from '../services/shop.service';
import {ProductService} from '../product.service';
import {Product} from '../_models/product';
import {Review} from '../_models/Review';
import {ReviewService} from '../services/review.service';

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
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shopId: number;
  shopToView: any = Shop;
  products: Product[];
  reviews: Review[];

  commentForm: FormGroup;
  isSubmitted: boolean = false;
  loggedIn: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private productService: ProductService,
  private reviewService: ReviewService, private frmBuilder: FormBuilder,
  private alertService: AlertService, private titleService: Title) {
  //  this.shopToView = new Shop();
   this.products = [];
   this.reviews = [];

   this.isSubmitted = false;

   this.loggedIn = JSON.parse(sessionStorage.getItem("isLogin"));
   }

   get comment() {
    return this.commentForm.get("comment");
   }

   get rating() {
     return this.commentForm.get("rating");
   }

   get title() {
     return this.commentForm.get("title");
   }

   get customerName() {
     return this.commentForm.get("customerName");
   }

  ngOnInit() {
    this.commentForm = this.frmBuilder.group({
      comment: ["", [Validators.required]],
      rating: ["", Validators.required],
      title: ["", Validators.required],
      customerName: [""]
    });


    this.shopId = parseInt(this.activatedRoute.snapshot.paramMap.get('shopId'));

    this.shopService.retrieveShopByShopId(this.shopId).subscribe(
      response => {
        this.shopToView = response;
        console.log("Current shop:", this.shopToView);
        //        console.log(this.productToView);
        // this.msgs.push({severity: "info", summary: "Product loaded successfully", detail: ""});
        // this.initProducts();

        this.products = this.shopToView.shop.products;
        this.initReviews();

        this.titleService.setTitle('giftme - Shop ' + this.shopToView.shop.shopName);
      },
      error => {
        // this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      }
    );
  }


  initProducts() {
    this.productService.getProductsByShopId(this.shopId).subscribe(
      response => {
        console.log("Product Service:", response);
        this.products.push(response.product); // strange that my array disappeared and the key is 'product' instead of products;
        // fix accordingly if key changes.
        console.log("this.products", this.products);
      },
      error => {
        // this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      }
    );
  }

  initReviews() {
    this.reviewService.retrieveAllReviewsByShopId(this.shopId).subscribe(
      response => {
        console.log("Review Service:", response.reviews);
        this.reviews = response.reviews;
      },
      error => {
        // this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      }
    );
  }

  createReview() {

    // needs a log in check too

    // set current customer name in the comment
    if (sessionStorage.getItem("isLogin")) {
        let currentCustomerName = JSON.parse(sessionStorage.getItem("user")).customer.firstName;

        this.commentForm.value.customerName = currentCustomerName;

        console.log("Comment form values", this.commentForm.value);

        if (this.commentForm.valid) {
          this.reviewService.createPostReview(this.commentForm.value, this.shopId).subscribe(
              response => {
                  console.log("succcess");
                  this.success("Review has been placed successfully!");
              }, error => {
                console.log("errrrror");
                this.error("Review has not been placed");
              }
          );
        } else {
          console.log("comment form isnt valod");
        }

    } else {
      console.log("Alert for user to be logged in ");
    }
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

}
