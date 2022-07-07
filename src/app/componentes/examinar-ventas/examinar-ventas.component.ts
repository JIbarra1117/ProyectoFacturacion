import { Component, Injectable, OnInit } from '@angular/core';
import {Factura,OperacionesFacturas} from 'src/app/Datos/Facturas';
import {FacturasService} from 'src/app/servicios/facturas.service';
@Component({ 
  selector: 'app-examinar-ventas',
  templateUrl: './examinar-ventas.component.html',
  styleUrls: ['./examinar-ventas.component.css']
})
@Injectable({
  providedIn: 'root'
})

export class ExaminarVentasComponent implements OnInit {
  //Variables
   Pagado=true;
   facturasPagada!: Factura[];
  constructor(private opFac:FacturasService) { }
  ngOnInit(): void {
  }
  obtenerFacturasPagadas(){
    this.opFac.obtenerFacturasPagadas(this.Pagado).subscribe((res:Factura[]) => {
      this.facturasPagada=res;
      console.log(res);
    });
  }
  
}
