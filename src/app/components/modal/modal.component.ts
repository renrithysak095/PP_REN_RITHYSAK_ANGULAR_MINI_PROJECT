import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { IBook } from 'src/app/interface/ibook';
import { BookService } from 'src/app/service/book.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  
  reactiveForm!: FormGroup;

  constructor(private toastr: ToastrService,private fb: FormBuilder, private _service: BookService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any){
    this.reactiveForm = this.fb.group(
      {
        title: new FormControl(),
        author: new FormControl(),
        description: new FormControl(),
    });

  this.reactiveForm.setValue({
      title: this.data.title,
      author: this.data.author,
      description: this.data.description,
  })

  }

  edit(){
    if(localStorage.getItem('isAuthorized') !== null){
      this._service.updateBook({...this.reactiveForm.value, id: this.data.id,bookImage: this.data.bookImage, category: this.data.category}).subscribe({
        next: (val) =>{
          console.log("vv: ", val)
        }
      })
      this.toastr.success('Update successfully')
    }else{
      this.toastr.error('Failed to update')
    }


  }



}
