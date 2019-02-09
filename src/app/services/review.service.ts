import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {Review} from '../_models/Review';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable()

export class ReviewService {
  baseUrl = "/api/Review";

  constructor(private httpClient: HttpClient) {
  }

  retrieveAllReviews(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllReviews").pipe
      (
      catchError(this.handleError)
      );
  }

  retrieveAllReviewsByShopId(shopId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllReviewsByShop/" + shopId).pipe
      (
      catchError(this.handleError)
      );
  }

  // Create new Post Review
  createPostReview(newReview: Review, shopId: number): Observable<any> {
    const obj = {
      "review": newReview,
      "shopId": shopId
    };

    console.log(obj);

    return this.httpClient.put<any>(this.baseUrl, obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An unknown error has occurred:', error.error.message);
    } else {
      console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
    }

    return new ErrorObservable(error);
  }
}
