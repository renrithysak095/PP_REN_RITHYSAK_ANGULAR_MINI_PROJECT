import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  reactiveForm!: FormGroup;
  _category!: any[]
  _listCategory!: any[]

  constructor(private toastr: ToastrService,private fb: FormBuilder, private _service: BookService, private router: Router){
    this.reactiveForm = this.fb.group(
      {
        title: new FormControl(null,Validators.required),
        author: new FormControl(null,Validators.required),
        category: new FormControl(null,Validators.required),
        description: new FormControl(null,Validators.required),
    });

    this._service.getBook().subscribe({
      next: (val)=>{
        this._category = val

        const uniqueCategories = new Set<string>();
        this._category.forEach(res => {
          uniqueCategories.add(res.category);
        });
        const uniqueCategoriesArray = Array.from(uniqueCategories);
        this._listCategory = uniqueCategoriesArray.map(category => ({ 'category': category }));
       

      }
    })
    
  }

  back(){
    this.router.navigate(['/books'])
  }

  addNewBook(){
    console.log("Check: ", this.reactiveForm.value)
    this._service.addBook({...this.reactiveForm.value, bookImage: 'https://i.pinimg.com/564x/9d/39/1d/9d391d44aa8a3e5a81d8a54571e09605.jpg'}).subscribe({
      next: (val) =>{
        console.log(val)
      }
    })
    this.router.navigate(['/books'])
    this.toastr.success('Book has added successfully')
  }

}
