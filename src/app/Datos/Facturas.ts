import { Time } from "@angular/common";
import {FacturasService} from "../servicios/facturas.service"
export class Factura{
    idFactura:number;
    idCliente:string;
    idTrabajador:string;
    fecha:Date;
    hora: Time;
    subtotal:number;
    iva=0.12;
    total:number;
    
    constructor(_idFactura:number,_idCliente:string,_idTrabajador:string,_fecha:Date,_hora:Time,_subtotal:number,_total:number){
        this.idFactura=_idFactura;
        this.idCliente=_idCliente;
        this.idTrabajador=_idTrabajador;
        this.fecha=_fecha;
        this.hora=_hora;
        this.subtotal=_subtotal;
        this.total=_total;
    }
}
export class OperacionesFacturas{
    constructor(private facturaServ:FacturasService){
    }
    obtenerFacturasPagadasONo(Pagado:boolean):string{
        const factura:Factura[] = [];
        this.facturaServ.obtenerFacturasPagadas(Pagado)?.subscribe((res:any) => {
            const facturaObj={_idFactura:1,_idCliente:'',_idTrabajador:'',_fecha:Date.now,_hora:{hora:1,min:3},_subtotal:0.0,_total:0.0}
            var listaJSOn = res;
            /*listaJSOn.forEach(element => {
                factura.push(new Factura(element.IDFactura,element.,'',new Date("2018-03-16"),{hours:1,minutes:1},0.0,0.0)||null);
            });*/
            return listaJSOn;
          });

          return 'null';
    }
}