import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private URL = 'http://localhost:3000';

  constructor(private http:HttpClient,
    private jwtHelper:JwtHelperService) { }

    obtenerFacturas(){
      try{
        const datos = this.http.get('/api/facturas');
      return datos; 
      }catch(error){
        console.log(error);
        return null;
      }
    }

    obtenerFacturasPagadas(Pagado:boolean){
      try{
        return this.http.post('/api/facturasPagadas',Pagado);
      //return datos; 
      }catch(error){
        console.log(error);
        return null;
      }
    }
}
