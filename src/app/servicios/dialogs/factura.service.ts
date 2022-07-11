import { EventEmitter, Injectable, Output} from '@angular/core';
import { Factura } from 'src/app/Datos/Facturas';
import { Time } from "@angular/common";
import { BehaviorSubject, Observable } from 'rxjs';

const initFactura:Factura={IDFactura:0,IDCliente:'',IDTrabajador:'',Fecha:new Date(Date.now()),Hora:{hours:new Date().getHours(),minutes:new Date().getMinutes()},Pagado:false,Total:0,Subtotal:0,Iva:0.12};
const initValidarFactura = false;
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private factura$ = new BehaviorSubject<Factura>(initFactura);
  private validarFactura$ =  new BehaviorSubject<boolean>(initValidarFactura);
  constructor() { }

  get selectedFactura$():Observable<Factura>{
    return this.factura$.asObservable();
  }

  setFactura(factura:Factura):void{
    this.factura$.next(factura);
  }

  get selectedValidarFatura$():Observable<boolean>{
    return this.validarFactura$.asObservable();
  }

  setValidarFactura(val:boolean):void{
    this.validarFactura$.next(val);

  }
}
