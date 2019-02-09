import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {Product} from './_models/product';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable()

export class ProductService {
  baseUrl = "/api/Product";

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllProducts").pipe
      (
      catchError(this.handleError)
      );
  }



  getProductByProductId(productId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveProduct/" + productId).pipe
      (
      catchError(this.handleError)
      );
  }

  getProductsByShopId(shopId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveProduct/" + shopId).pipe
      (
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An unknown error has occurred:', error.error.message);
    }
    else {
      console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
    }

    return new ErrorObservable(error);
  }
}
