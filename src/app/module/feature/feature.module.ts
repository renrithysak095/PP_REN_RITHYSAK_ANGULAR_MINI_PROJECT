import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BookComponent } from 'src/app/components/book/book.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AddbookComponent } from 'src/app/components/addbook/addbook.component';


const route: Route[] = [
  { path: '' , component: BookComponent},
  { path: 'books', component: LayoutComponent},
  { path : 'addNewBook', component: AddbookComponent}
]

@NgModule({
  declarations: [LayoutComponent,AddbookComponent,BookComponent,HeaderComponent,NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ],
  exports: [LayoutComponent,AddbookComponent,BookComponent,HeaderComponent,NavbarComponent]
})
export class FeatureModule { }
