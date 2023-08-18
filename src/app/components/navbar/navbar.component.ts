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

  constructor(private router: Router,private authService: AuthService){}

  ngDoCheck(): void {
    this._isLogin = this.authService.getIsAuthorized();
  }
  
  goBook(){
    this.router.navigate(['/books'])
  }

  isLogout(){
    this._isLogin = false
    this.authService.isAuthorized = false
    localStorage.removeItem('isAuthorized');
  }


}

