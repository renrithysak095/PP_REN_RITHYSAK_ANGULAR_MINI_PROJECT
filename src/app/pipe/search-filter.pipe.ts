import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from '../interface/ibook';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(books: IBook[], searchTerm: string): IBook[] {
    if (!searchTerm) {
      return books;
    }

    const filteredBooks = books.filter(book => book.category.toLowerCase().startsWith(searchTerm.toLowerCase()));
    return filteredBooks;
  }
}
