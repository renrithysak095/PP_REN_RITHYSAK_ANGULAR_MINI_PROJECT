import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent{

   id:any;
   detail!: any

  constructor(private route: ActivatedRoute, private service: BookService, private router: Router){

    this.route.paramMap.subscribe((res)=>{
      this.id = res.get('id')
      this.service.getBookById(this.id).subscribe({
        next: (val) => {
          this.detail = val
        }
      })
    });

  }

  back(){
      if(this.service.getIsBack() === '/books'){
        this.router.navigate(['/books'])
      }else if(this.service.getIsBack() === '/'){
        this.router.navigate(['/'])
      }else{
        this.router.navigate(['/'])
      }
  }

}
