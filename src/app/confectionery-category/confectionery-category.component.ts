import { Component, OnInit } from '@angular/core';

import {Product} from '../_models/product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-confectionery-category',
  templateUrl: './confectionery-category.component.html',
  styleUrls: ['./confectionery-category.component.css']
})
export class ConfectioneryCategoryComponent implements OnInit {

  products: Product[];
  msgs: any[] = [];
  filteredProducts: Product[];
  priceFilteredProducts: Product[];

  maxPrice: number = 1;
  prices: any[] = []; // holds prices of all products

  public someRange: number[] = [0, this.maxPrice];

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.filteredProducts = [];
    this.priceFilteredProducts = [];

    this.productService.getProducts().subscribe(
      response => {
        this.products = response.products;

        // check all products: if product category matches "confectionery", then do not remove from array
        for (var i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "Confectionary") {
            this.filteredProducts.push(this.products[i]);
            this.prices.push(this.products[i].price);
          }
        }
        this.priceFilteredProducts = this.filteredProducts;
        console.log("Filtered Products", this.filteredProducts);
        this.calculateMax();
        this.someRange = [0, this.maxPrice];

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
