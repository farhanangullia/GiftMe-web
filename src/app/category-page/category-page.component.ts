import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Product} from '../_models/product';
import {ProductService} from '../product.service';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  products: Product[];
  msgs: any[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
    response => {
      this.products = response.products;
      console.log(this.products);
    }, error => {
      this.msgs.push({severity:"error", summary:"HTTP " + error.status, detail:error.error.message});
    });
  }

}
