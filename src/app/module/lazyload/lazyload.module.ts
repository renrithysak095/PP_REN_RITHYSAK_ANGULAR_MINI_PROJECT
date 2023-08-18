import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReadBookComponent } from 'src/app/components/read-book/read-book.component';

const route : Routes =[
   { path: 'login', component: LoginComponent },
   { path : 'books/:id', component: ReadBookComponent},

]

@NgModule({
  declarations: [LoginComponent,ReadBookComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule.forChild(route),
    FormsModule
  ],
  exports: [LoginComponent,ReadBookComponent]
})
export class LazyloadModule { }
