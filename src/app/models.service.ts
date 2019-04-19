import { Injectable } from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiModels = 'http://localhost:4000/uploadToMongo';

@Injectable()
export class ModelsService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  uploadModel(data): Observable<any> {
    return this.http.post(`${apiModels}/models`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllModels(): Observable<any> {
    console.log("inside get all models...")
    return this.http.get(`${apiModels}/models`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getModelsBasedOnModelName(name: string, userID: string): Observable<any> {
    console.log("inside files service getmodelsonname"+name);
    return this.http.get(`${apiModels}/models?name=`+name+'&userID='+userID, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
