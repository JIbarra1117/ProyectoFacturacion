import { EventEmitter, Injectable, Output} from '@angular/core';
import { Factura } from 'src/app/Datos/Facturas';
import { Time } from "@angular/common";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { ClienteI } from 'src/app/Datos/claseCliente';

const initFactura:Factura={IDFactura:0,IDCliente:'',IDTrabajador:'',Fecha:new Date(Date.now()),Hora:{hours:new Date().getHours(),minutes:new Date().getMinutes()},Pagado:false,Total:0,Subtotal:0,Iva:0.12};
const initValidarFactura = false;
const initProducto:ProductoFactI={IDFactura:0,IDProducto:0,Cantidad:0,Precio:0,Producto:''};
const initCliente:ClienteI={Apellido:'', Apellido2:'',Cedula:'',Domicilio:'',Nombre:'',Nombre2:'',Telefono:''}
const initProductoGeneral:ProductoI={IDFactVenta:0,IDProducto:0,Imagen:0,Precio:0,Producto:'',Stock:0}
const initProductoIngresar:ProductoFactI={IDFactura:0,IDProducto:0,Cantidad:0,Precio:0,Producto:''};
const initNumFactProd:number=0;
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private factura$ = new BehaviorSubject<Factura>(initFactura);
  private producto$ = new BehaviorSubject<ProductoFactI>(initProducto);
  private validarFactura$ =  new BehaviorSubject<boolean>(initValidarFactura);
  private cliente$ = new BehaviorSubject<ClienteI>(initCliente);
  private productoGeneral$ = new BehaviorSubject<ProductoI>(initProductoGeneral);
  private productoIngresar$ = new BehaviorSubject<ProductoFactI>(initProductoIngresar);
  private numFacturaPrd$ = new BehaviorSubject<number>(initNumFactProd);
  constructor() { }

  get selectedFactura$():Observable<Factura>{
    return this.factura$.asObservable();
  }

  setFactura(factura:Factura):void{
    this.factura$.next(factura);
  }
  get selectedProducto$():Observable<ProductoFactI>{
    return this.producto$.asObservable();
  }
  setProducto(prod:ProductoFactI){
    this.producto$.next(prod);
  }

  get selectedValidarFatura$():Observable<boolean>{
    return this.validarFactura$.asObservable();
  }

  setValidarFactura(val:boolean):void{
    this.validarFactura$.next(val);

  }

  get selectedClienteFact$():Observable<ClienteI>{
    return this.cliente$.asObservable();
  }

  setClienteFact(val:ClienteI):void{
    this.cliente$.next(val);

  }

  
  get selectedProductoGeneral$():Observable<ProductoI>{
    return this.productoGeneral$.asObservable();
  }

  setProductoGeneral(val:ProductoI):void{
    this.productoGeneral$.next(val);

  }


  get selectedProductoIngresar$():Observable<ProductoFactI>{
    return this.productoIngresar$.asObservable();
  }

  setProductoIngresar(val:ProductoFactI):void{
    this.productoIngresar$.next(val);

  }

  get selecteNumFacturaProducto$():Observable<number>{
    return this.numFacturaPrd$.asObservable();
  }

  setNumFacturaProd(val:number):void{
    this.numFacturaPrd$.next(val);

  }
}
