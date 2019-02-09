import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Product} from '../_models/product';
import {ProductService} from '../product.service';

import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private router: Router, private productService: ProductService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('giftme - Shop for Gifts Online Singapore');

    this.productService.getProducts().subscribe(
      response => {
        this.products = response.products;

        // show only latest 8 products
        if (this.products.length > 8) {
          this.products.splice(8); // remove all elements after and inclusive of index 8
        }
      }, error => {

      });
  }

}
