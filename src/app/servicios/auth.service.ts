import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { EmpleadoCompletoI, EmpleadoI, idAux } from '../Datos/claseUsuarios';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private URL = 'http://localhost:3000';
  constructor(private http:HttpClient,
    private jwtHelper:JwtHelperService) { }

  singin(user={Cedula:'',Contra:''}){
    //console.log(user);
    return this.http.post(this.URL+'/api/singin',user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(token!=null){
      if(this.jwtHelper.isTokenExpired (token) || !localStorage.getItem('token')){
        //console.log(token);
        return false;
      }
      return true;
    }
    return false;
  }

  consultarEmpleado(cedula:string):Observable<EmpleadoI[]>{
    var dato={
      Cedula:cedula
    };
    return this.http.post<EmpleadoI[]>('/api/empleado',dato);    
  }

}
