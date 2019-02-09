import { Component, OnInit, ApplicationRef, ChangeDetectorRef  } from '@angular/core';

import {ShopService} from '../services/shop.service';
import {Shop} from '../_models/shop';

import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: any = [];

  public items: Array<any>;
  public filterItems: Array<any>;
  public permaItems: Array<any>;

  public objectsWithGettersFilter: any = { name: null };


  constructor(private shopService: ShopService,
    private changeRef: ChangeDetectorRef, private appRef: ApplicationRef,
  private titleService: Title) {
    this.shops = [];

    this.items = []; // for filtered items

    this.filterItems = []; // for filter categories

    this.permaItems = []; // permenant list of items

  }

  ngOnInit() {
    this.titleService.setTitle('giftme - All Shops');

    this.retrieveAllShops();

    this.filterItems = [
      {
        value: 'North',
        checked: false
      },
      {
        value: 'South',
        checked: false
      },
      {
        value: 'East',
        checked: false
      },
      {
        value: 'West',
        checked: false
      },
      {
        value: 'Central',
        checked: false
      }
    ];
  }

  retrieveAllShops() {
    this.shopService.retrieveAllShops().subscribe(
      response => {
        console.log(response);

        // store shops into a shops array
        let shopsResponse = response.shops;

        for (var i = 0; i < shopsResponse.length; i++) {
          let obj = {shop: shopsResponse[i], property: shopsResponse[i].area};
          this.items.push(obj);
          this.permaItems.push(obj);
        }

        this.assignCopy();
        console.log("this.items", this.items);
      }, error => {

      }
    );
  }


  checked() {
    return this.filterItems.filter(item => {
      return item.checked; });
  }

  assignCopy(){
    this.items = Object.assign([], this.permaItems);
    console.log("this.assignments at assigncopy", this.items);
 }

 filterItem(value){
   console.log("search value", value);
    if(!value) this.assignCopy(); //when nothing has typed

    this.items = Object.assign([], this.permaItems).filter(
       item => JSON.stringify(item).toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    console.log('this.items', this.items);
 }



}
