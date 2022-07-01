import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router: Router
    ){  }

  canActivate():boolean{ 
    if(!this.authService.isAuth()){
      console.log('El token no es válido o ya expiró!');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
