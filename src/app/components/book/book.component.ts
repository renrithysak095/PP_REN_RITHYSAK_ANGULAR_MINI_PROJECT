import { Component } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { OnInit } from '@angular/core'
import { IBook } from 'src/app/interface/ibook';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  
  constructor(private toastr: ToastrService,public dialog: MatDialog,private service:BookService, private router: Router, private route: ActivatedRoute){}

  _listBooks!: IBook[]
  
  ngOnInit(): void {
    this.getListBook()
  }

  // Get list book from service
  getListBook(){
    this.service. getBook().subscribe({
      next: (val) => this._listBooks = val
    })
  }

  // Delete Book
  deleteBook(id:number){
    if(localStorage.getItem('isAuthorized') !== null){
      this.service.deleteBook(id).subscribe();
      this.getListBook();
      this.toastr.success('Delete successfully')
    }else{
      this.toastr.error('Failed to delete')
    }
    
  }

  // View Book
  viewBook(id:number){
    this.service.isBack('/')
    this.router.navigate(['/books',id])
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(ModalComponent, {data: {...data}});
    dialogRef.afterClosed().subscribe(result => {
      this.getListBook()
    });
  }

}
