import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../servicios/auth.service';

//Decodificar el token
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    public route:Router
  ){}
  canActivate(route:ActivatedRouteSnapshot):boolean {
    let usuario={Nombre:String,Apellido:String,Cedula:String,Rol:String};
    const expectedRole = route.data["expectedRole"];
    const token = localStorage.getItem('token');
    //var {Nombre:String,Apellido:String,Cedula:String,Rol:String};
    if(token!=null){
      usuario= decode(token);
      //console.log(usuario.Nombre+' '+usuario.Apellido);
      if(!this.authService.isAuth() || usuario.Rol!== expectedRole){
          console.log('Usuario no autorizado para la vista');
          this.route.navigate(['']);
          return false;
      }
    }else{
      console.log('No se logró decodificar el TOKEN!!');
    }
   // console.log(decode(token));
    return true;
  }
  
}
