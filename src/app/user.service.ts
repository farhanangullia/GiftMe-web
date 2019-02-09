import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {Customer} from './_models/user';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()

export class UserService {
  baseUrl = "/api/Customer";

  constructor(private httpClient: HttpClient) {

  }


  // Auth methods here
  getUser(email: string, password: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getCustomer" + "?email=" + email + "&password=" + password).pipe(
      catchError(this.handleError)
    );
  }


  //Create new user
  createNewUser(newCustomer: Customer): Observable<any> {

    const createUserReq = {
      "customer": newCustomer
    };

    return this.httpClient.put<any>(this.baseUrl, createUserReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update new user
  updateUser(customer: Customer): Observable<any> {
    const obj = {
      "customer": customer
    };

    console.log(obj);

    return this.httpClient.post<any>(this.baseUrl + "/updateCustomer", obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update user password
  updateUserPassword(customer: Customer): Observable<any> {
    const obj = {
      "customer": customer
    };

    return this.httpClient.post<any>(this.baseUrl + "/updateCustomerPassword", obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  forgotUserPassword(email: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/forgotPassword?email=" + email).pipe(
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
