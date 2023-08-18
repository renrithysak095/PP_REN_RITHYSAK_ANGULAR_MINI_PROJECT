import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const router = inject(Router);

  const token = localStorage.getItem('isAuthorized')
  
  if(token !== null){
    return true;
  }
  return router.createUrlTree(['/login']);
  
};
