import { Component, OnInit, Input } from '@angular/core';
 
@Component({
  selector: 'ProductCard',
  templateUrl: './ProductCard.component.html'
})
export class ProductCard implements OnInit {

  // Define attributes of a Product Card here
    @Input()
    public productName: string;

    ngOnInit() {
      if (!this.productName || this.productName.length === 0) {
        console.log("error - product name not provided");
      }
    }
}
