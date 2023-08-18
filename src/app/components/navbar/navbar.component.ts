import { Component, DoCheck } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{

  _isLogin!:boolean

  constructor(private router: Router){}

  ngDoCheck(): void {
    if(localStorage.getItem('isAuthorized') !== null){
      this._isLogin = true
    }
  }

  goBook(){
    this.router.navigate(['/books'])
  }

  isLogout(){
    this._isLogin = false
    localStorage.removeItem('isAuthorized');
  }


}

