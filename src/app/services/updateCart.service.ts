import {Subject} from 'rxjs/Subject';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class UpdateCartService {

    public invokeEvent: Subject<any> = new Subject();

    invokeEventObservable$ = this.invokeEvent.asObservable();

    constructor() {}

    callComponent(value) {
      this.invokeEvent.next({some: value});
  }
}
