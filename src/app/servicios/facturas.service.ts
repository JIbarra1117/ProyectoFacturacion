import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {Factura, FacturaAux} from 'src/app/Datos/Facturas';

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

    insertarProductosFactura(idFactura:number,idProd:number,cantidad:number){
      var dato ={
        IDFactura:idFactura,IDProducto:idProd,Cantidad:cantidad
      }
      return this.http.post<Factura[]>('api/insertarProductosFact',dato);
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

    eliminarProductoFact(idFac:number,idProd:number):Observable<boolean>{
        var data={IDFactura:idFac,IDProducto:idProd};
        return this.http.post<boolean>('api/elimProdFact',data);
    }

    insertarFactura(factura:FacturaAux):Observable<string>{
        return this.http.post<string>('api/insertarFactura',factura);
    }

    crearTransaccion(){
      return this.http.get('api/transaccion');
    }
    
    crearPuntoSeguro(){
      return this.http.get('api/savePoint');
    }
    crearTransaccionRechazada(){
      return this.http.get('api/rollback');
    }

    transaccionSegura(){
      return this.http.get('api/guardado');
    }
}
