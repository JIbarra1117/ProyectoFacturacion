import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { EmpleadoI } from '../Datos/claseUsuarios';
import { ClienteI } from '../Datos/claseCliente';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private http:HttpClient) { }

  obtenerCliente(cedula:string):Observable<ClienteI[]>{
    var data={Cedula:cedula};
    return this.http.post<ClienteI[]>('/api/clienteFact',data);
  }
  clientes():Observable<ClienteI[]>{
    return this.http.get<ClienteI[]>('/api/clientes');
  }
}
