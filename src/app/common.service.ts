import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from './model/category';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private API = 'http://localhost:3000/';
  apiCalledEvent: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.apiCalledEvent = new EventEmitter();
  }

  getCategories = (): Observable<ICategory[]> => {
    return this.http
      .get<ICategory[]>(this.API + 'categories')
      .pipe(catchError(this.errorHandler));
  };

  errorHandler(httpErrorResponce: HttpErrorResponse) {
    return throwError({
      status: httpErrorResponce.status,
      message: httpErrorResponce.message,
    });
  }

  saveCategory(data: ICategory) {
    return this.http
      .post(this.API + 'categories', data)
      .pipe(catchError(this.errorHandler));
  }

  deleteCategory(id: number) {
    return this.http
      .delete(this.API + 'categories/'+id)
      .pipe(catchError(this.errorHandler));
  }

  apiCalled = (status: boolean) => {
    this.apiCalledEvent.emit(status);
  };
}
