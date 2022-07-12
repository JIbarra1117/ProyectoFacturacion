import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Factura} from 'src/app/Datos/Facturas';
import { ProductoFactI, ProductoI } from '../Datos/claseProducto';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  obtenerProductosFactura(IDFactura:number):Observable<ProductoFactI[]>{
    var dato ={
      IDFactura:IDFactura
    }
    return this.http.post<ProductoFactI[]>('/api/productosFact',dato);
  }  
  obtenerProductos():Observable<ProductoI[]>{
    return this.http.get<ProductoI[]>('/api/productos');
  }
}
