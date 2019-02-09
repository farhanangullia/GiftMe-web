import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

  const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TimeService {
  
  baseUrl = "/api/Time";
  
  constructor(private httpClient: HttpClient) {
  
  
   }

  
  getTime(): Observable<any> 
{
  return this.httpClient.get<any>(this.baseUrl).pipe
  (
    catchError(this.handleError)
  );    
}

private handleError(error: HttpErrorResponse)
{
  if (error.error instanceof ErrorEvent) 
  {   
    console.error('An unknown error has occurred:', error.error.message);
  } 
  else 
  {   
    console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
  }
  
  return new ErrorObservable(error);
}
  
}
