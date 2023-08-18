import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IBook } from 'src/app/interface/ibook';
import { BookService } from 'src/app/service/book.service';
import { ModalComponent } from '../modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  _listBooks!: IBook[]
  _listGenreBooks!: IBook[]
  _listsearchBooks!: any[]
  _listGenre!: any[]
  _bookId!: number;
  maxArrayLength: number = 0;

  _defaultCard: boolean = true
  _genreCard: boolean = false
  _searchCard: boolean = false
  _isClicked: boolean = false
  _isSmaller: boolean = false
  _category: string = 'default'
  _searchBook!: string
  searchInputSubject = new Subject<string>();

  constructor(private toastr: ToastrService,public dialog: MatDialog,private service:BookService, private router: Router, private route: ActivatedRoute){
    this.searchInputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => this.filterSearch(searchTerm));
  }

  ngOnInit(): void {
    this.getListBook()
  }
  
  // Get list book from service
  getListBook(){
    this.service. getBook().subscribe({
      next: (val) => {

        this._listBooks = val
        this.maxArrayLength = val.length
        
        const uniqueCategories = new Set<string>();
        this._listBooks.forEach(res => {
          uniqueCategories.add(res.category);
        });
      const uniqueCategoriesArray = Array.from(uniqueCategories);
      this._listGenre = uniqueCategoriesArray.map(category => ({ 'category': category }));
       
      },
    })
  }

  // Add New Book
  addNewBook(){
    let _staticData = {
      id: 3,
      title: 'Omg',
      description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
      bookImage: 'https://i.pinimg.com/564x/cb/80/99/cb80993dfe4c5a1dd5ee19f3a6c9284e.jpg',
      author: 'Seaman Cap',
      category: 'Sad'
    } ;
    this.service.addBook(_staticData).subscribe();
    this.getListBook();
  }


  // Delete Book
  deleteBook(id:number){
    this.service.deleteBook(id).subscribe();
    this.getListBook();
    this.toastr.success('Deleted sucessfully')
    this._defaultCard = true
    this._category = 'default'
  }

  // Find Card
  filterCard(genre: string){
    this.service.getBook().pipe(
      map(books => books.filter(book => book.category === genre))
    ).subscribe({
      next: (val) => {
        this._listGenreBooks = val
        this.maxArrayLength = val.length
      },
    })

    this._category = genre
    this._isClicked = true
    this._genreCard = true
    this._defaultCard = false

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryName: genre },
      queryParamsHandling: 'merge'
    });
  }

  // All Book
  allGenre(){
    this.maxArrayLength = this._listBooks.length
    this._category = 'default'
    this._genreCard = false
    this._defaultCard = true
  }

  // Search Book
  
  onSearchInputChanged(searchTerm: string) {
    this.searchInputSubject.next(searchTerm);
  }
  
  customFilter(books: IBook[], searchTerm: string): IBook[] {
    if (!searchTerm) {
      return books;
    }
    const filteredBooks = books.filter(book => book.category.toLowerCase().startsWith(searchTerm.toLowerCase()));
    return filteredBooks;
  }

  filterSearch(searchTerm: string) {
    this.service.getBook().subscribe({
      next: (books) => {
        const filteredBooks = this.customFilter(books, searchTerm);
        const uniqueCategories = new Set<string>();
        filteredBooks.forEach(res => {
          uniqueCategories.add(res.category);
        });
        const uniqueCategoriesArray = Array.from(uniqueCategories);
        this._listsearchBooks = uniqueCategoriesArray.map(category => ({ 'category': category }));
        this.maxArrayLength = books.length;
        this._searchCard = this._listsearchBooks.length > 0;
      }
    });
  }
  

  
  // View Book
  viewBook(id:number){
    this.service.isBack('/books')
    this.router.navigate(['/books',id])
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(ModalComponent, {data: {...data}});
    dialogRef.afterClosed().subscribe(result => {
      this.getListBook()
    });
  }

  AddBook(){
    this.router.navigate(['/addNewBook'])
  }

}

  
