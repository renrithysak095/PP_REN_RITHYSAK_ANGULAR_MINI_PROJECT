import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IBook } from '../interface/ibook';
import { IAuth } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{
  constructor() { }

  createDb(){
    let bookDetails: IBook[] = [
      {
        id: 1,
        title: 'Business',
        description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
        bookImage: 'https://i.pinimg.com/564x/cb/80/99/cb80993dfe4c5a1dd5ee19f3a6c9284e.jpg',
        author: 'Seaman Cap',
        category: 'Business'
      },
      {
        id: 2,
        title: 'Science',
        description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
        bookImage: 'https://i.pinimg.com/564x/e1/e7/04/e1e7043c2bfbbe177a63f2930232ab90.jpg',
        author: 'Seaman Cap',
        category: 'Science'
      },
      {
        id: 3,
        title: 'Fiction',
        description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
        bookImage: 'https://i.pinimg.com/564x/e1/e7/04/e1e7043c2bfbbe177a63f2930232ab90.jpg',
        author: 'Seaman Cap',
        category: 'Fiction'
      },
      {
        id: 4,
        title: 'Philosophy',
        description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
        bookImage: 'https://i.pinimg.com/564x/e1/e7/04/e1e7043c2bfbbe177a63f2930232ab90.jpg',
        author: 'Seaman Cap',
        category: 'Philosophy'
      },
      {
        id: 5,
        title: 'Biology',
        description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
        bookImage: 'https://i.pinimg.com/564x/e1/e7/04/e1e7043c2bfbbe177a63f2930232ab90.jpg',
        author: 'Seaman Cap',
        category: 'Biology'
      },
      {
        id: 6,
        title: 'Math',
        description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
        bookImage: 'https://i.pinimg.com/564x/e1/e7/04/e1e7043c2bfbbe177a63f2930232ab90.jpg',
        author: 'Seaman Cap',
        category: 'Biology'
      }
    ]

    let login: IAuth = {
      email: 'ren_rithysak123@gmail.com',
      password: 'rithysaK123@'
    }

    return {bookDetails, login}
  }
}
