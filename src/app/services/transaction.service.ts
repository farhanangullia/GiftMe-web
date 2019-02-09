import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

// import {Product} from './_models/product';
import {RemoteCheckoutLineItem} from '../_models/RemoteCheckoutLineItem';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable()

export class TransactionService {
  baseUrl = "/api/Transaction";

  constructor(private httpClient: HttpClient) {
  }

  // retrieveAllShops(): Observable<any> {
  //   return this.httpClient.get<any>(this.baseUrl + "/retrieveAllShops").pipe
  //     (
  //     catchError(this.handleError)
  //     );
  // }


  // retrieveShopByShopId(shopId: number): Observable<any> {
  //   return this.httpClient.get<any>(this.baseUrl + "/retrieveShop/" + shopId).pipe
  //     (
  //     catchError(this.handleError)
  //     );
  // }


  // Create new Transaction
  createTransaction(remoteCheckoutLineItems: RemoteCheckoutLineItem[],
    promoCode: string, email: string, customerAddress: string, shopAddress: string): Observable<any> {
    const obj = {
      "remoteCheckoutLineItems": remoteCheckoutLineItems,
      "promoCode": promoCode,
      "email": email,
      "customerAddress": customerAddress,
      "shopAddress": shopAddress
    };

    console.log(obj);

    return this.httpClient.put<any>(this.baseUrl, obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // retrieve an array of Transactions made by email
  retrieveTransactions(email: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllTransactionsByEmail/?email=" + email).pipe(
      catchError(this.handleError)
    );
  }

  // retrieve a transaction by delivery code
  retrieveTransactionByDeliveryCode(deliveryCode: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveTransactionByDeliveryCode?deliveryCode=" + deliveryCode).pipe(
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
