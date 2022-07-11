import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {Factura} from 'src/app/Datos/Facturas';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private URL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

    obtenerFacturas(){
      try{
        const datos = this.http.get('/api/facturas');
      return datos; 
      }catch(error){
        console.log(error);
        return null;
      }
    }

    obtenerFacturasPagadas(Pagado:boolean):Observable<Factura[]>{
        var dato ={
          Pagado:Pagado
        }
        return this.http.post<Factura[]>('api/facturasPagadas',dato);
      //return datos; 
    }

    actualizarFac(idFac:number):Observable<boolean>{
      var dato ={
        IDFactura:idFac
      }
      return this.http.post<boolean>('api/actFactura',dato);

    }
}
