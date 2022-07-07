import { Component, OnInit } from '@angular/core';
import {Factura,OperacionesFacturas} from 'src/app/Datos/Facturas';
import {FacturasService} from 'src/app/servicios/facturas.service';
@Component({ 
  selector: 'app-examinar-ventas',
  templateUrl: './examinar-ventas.component.html',
  styleUrls: ['./examinar-ventas.component.css']
})
export class ExaminarVentasComponent implements OnInit {
  //Variables
   facturasPagadas:any;

  constructor(private opFac:FacturasService) { }
  ngOnInit(): void {
  }
  obtenerDatas():any{
    this.opFac.obtenerFacturasPagadas(true)?.subscribe((res:any) => {
      const facturaObj={_idFactura:1,_idCliente:'',_idTrabajador:'',_fecha:Date.now,_hora:{hora:1,min:3},_subtotal:0.0,_total:0.0}
      console.log(res);
      this.facturasPagadas = res.rows;
      /*listaJSOn.forEach(element => {
          factura.push(new Factura(element.IDFactura,element.,'',new Date("2018-03-16"),{hours:1,minutes:1},0.0,0.0)||null);
      });*/
    });

  }
  
}
