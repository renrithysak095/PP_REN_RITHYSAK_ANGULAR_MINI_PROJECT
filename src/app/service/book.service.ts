import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../interface/ibook';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private router: Router) {}

  private baseURL = 'api/bookDetails/'
  private isBackTo!: string

  // Get All Books
  getBook(){
    return this.http.get<IBook[]>('api/bookDetails').pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  }

  getBookById(id:number){
    return this.http.get<IBook[]>('api/bookDetails/'+id).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  }

  // Add new Books
  addBook(_newBook: IBook){
    return this.http.post<IBook[]>(this.baseURL, _newBook).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  }

   // Update Books
   updateBook(_newBook: IBook){
    return this.http.put<IBook[]>(this.baseURL + _newBook.id,_newBook).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  } 

  // Delete Books
  deleteBook(id: number){
    return this.http.delete(this.baseURL + id)
  }

  // IsBack
  isBack(to:string){
    this.isBackTo = to
  }

  getIsBack(){
    return this.isBackTo
  }

}

