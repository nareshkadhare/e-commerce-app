import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from './model/category';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private API = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  
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
}
