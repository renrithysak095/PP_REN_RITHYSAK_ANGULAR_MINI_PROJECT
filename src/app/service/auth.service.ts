import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuth } from '../interface/auth';
import { catchError, retry, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators'

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

  login() {
    this.isAuthorized = true;
  }

  getIsAuthorized() {
    return this.isAuthorized;
  }


  isLoggedIn(_user: IAuth){
    return this.http.post<IAuth>(this.baseURL,_user).pipe(

      map((res) => console.log("Checking: ", res)),

      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
      
      );
  }



  
}
