import {Component, OnInit, ViewEncapsulation, ApplicationRef, ChangeDetectorRef } from '@angular/core';

import {Router} from '@angular/router';

import {Product} from '../_models/product';
import {ProductService} from '../product.service';

import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-flowers-category',
  templateUrl: './flowers-category.component.html',
  styleUrls: ['./flowers-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FlowersCategoryComponent implements OnInit {

  products: Product[];
  msgs: any[] = [];
  filteredProducts: Product[];
  priceFilteredProducts: Product[];

  maxPrice: number = 1;
  prices: any[] = []; // holds prices of all products

  public someRange: number[] = [0, this.maxPrice];

  public filterItems: Array<any>;

  constructor(private router: Router, private productService: ProductService,
    private changeRef: ChangeDetectorRef, private appRef: ApplicationRef,
    private titleService: Title) {
    this.filterItems = []; // for filter categories
  }

  ngOnInit() {
    this.titleService.setTitle('giftme - Flowers');

    this.filterItems = [
      {
        value: 'Red',
        checked: false
      },
      {
        value: 'Blue',
        checked: false
      },
      {
        value: 'Yellow',
        checked: false
      }
    ];

    this.filteredProducts = [];
    this.priceFilteredProducts = [];

    this.productService.getProducts().subscribe(
      response => {
        this.products = response.products;

        let productResponse = response.products;

        // check all products: if product category matches "flowers", then do not remove from array
        for (var i = 0; i < productResponse.length; i++) {
          if (this.products[i].category === "Flowers") {
            // let obj = {flower: productResponse[i], property: productResponse[i].colour};
            this.filteredProducts.push(this.products[i]);
            this.prices.push(this.products[i].price);
            // this.filteredProducts.push(obj);
          }
        }

      this.priceFilteredProducts = this.filteredProducts;
      this.calculateMax();
      this.someRange = [0, this.maxPrice];

        console.log("Filtered Products", this.filteredProducts);
      },
      error => {
        this.msgs.push({severity: "error", summary: "HTTP " + error.status, detail: error.error.message});
      });
  }

  calculateMax() {
    // calculates max price inside an array
    // for price filter
   this.maxPrice = this.prices.reduce(function(a, b) {return Math.max(a, b); });
  }


  checked() {
    return this.filterItems.filter(item => {
      return item.checked; });
  }


  priceFilter() {
    // Filters price based on someRange (nouislider)

    // Everytime we start this method, we clear the exisiting pricefilteredproduct
    this.priceFilteredProducts = [];

    // Looks through current "filtered products" aka the category itself
    for (var i = 0; i < this.filteredProducts.length; i++) {
      console.log("Min Price", this.someRange[0]);
      console.log(this.filteredProducts[0].price);
      if (this.filteredProducts[i].price >= this.someRange[0] && this.filteredProducts[i].price <= this.someRange[1]) {
          this.priceFilteredProducts.push(this.filteredProducts[i]);
      }
    }

    console.log("Price Filtered Products", this.priceFilteredProducts);


    // then place it into priceFilteredProducts to be rendered
  }

  // filter item search bar
  filterItem(value) {
    console.log("search value", value);
     // if(!value) this.assignCopy(); //when nothing has typed

     this.priceFilteredProducts  = Object.assign([], this.filteredProducts).filter(
        item => JSON.stringify(item).toLowerCase().indexOf(value.toLowerCase()) > -1
     );

     console.log('this.priceFilteredProducts ', this.priceFilteredProducts);
  }

}
