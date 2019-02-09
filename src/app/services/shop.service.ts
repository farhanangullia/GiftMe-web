import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

// import {Product} from './_models/product';
import {Shop} from '../_models/shop';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable()

export class ShopService {
  baseUrl = "/api/Shop";

  constructor(private httpClient: HttpClient) {
  }

  retrieveAllShops(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllShops").pipe
      (
      catchError(this.handleError)
      );
  }


  retrieveShopByShopId(shopId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveShop/" + shopId).pipe
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
