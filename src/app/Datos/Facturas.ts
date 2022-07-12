import { Time } from "@angular/common";
import {FacturasService} from "../servicios/facturas.service"

export interface Factura{
    IDFactura:number;
    IDCliente:string;
    IDTrabajador:string;
    Fecha:Date;
    Hora: Time;
    Subtotal:number;
    Iva:0.12;
    Total:number;
    Pagado:boolean;
}
export interface FacturaAux{
    IDFactura:number;
    IDCliente:string;
    IDTrabajador:string;
    Fecha:string;
    Hora: string;
    Subtotal:number;
    Iva:0.12;
    Total:number;
    Pagado:boolean;
  }

export class OperacionesFacturas{
     public facturasPagadas!:Factura[];
     Pagado = true;
    constructor(private facturaServ:FacturasService){
    }
    //validarFacturas(Pagado:boolean){//:Factura[]{
        
        //this.facturaServ.obtenerFacturasPagadas(Pagado).subscribe(this.obtenerFacturasPagadas);/*(res:Factura[]) => {
            //var listaJSOn = res;
            //console.log(res);
           // factura=res;
            /*res.forEach((element: Factura) => {
                console.log(element);
                factura.push({  IDFactura:element.IDFactura,
                                IDTrabajador: element.IDTrabajador,
                                IDCliente:element.IDCliente,
                                Iva:element.Iva,
                                Pagado:element.Pagado,
                                Subtotal:element.Subtotal,
                                Total:element.Total,
                                Fecha:element.Fecha,
                                Hora:element.Hora});
            });
            return factura;
          });*/
        //return factura;
    //}
    obtenerDatas(){
        this.facturaServ.obtenerFacturasPagadas(this.Pagado).subscribe((res:Factura[]) => {
          this.facturasPagadas=res;
          console.log(res);
        });
    }
}