import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuth } from '../interface/auth';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  isAuthorized = false;
  baseURL = 'api/login/';
  constructor(private _authApi: DataService,private http: HttpClient) { }

  getAuth(){
    return this.http.get<IAuth>(this.baseURL).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  }


  
}
