import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/Datos/Facturas';
import {FacturaService} from 'src/app/servicios/dialogs/factura.service';


@Component({
  selector: 'app-factura-seleccionada',
  templateUrl: './factura-seleccionada.component.html',
  styleUrls: ['./factura-seleccionada.component.css']
})
export class FacturaSeleccionadaComponent implements OnInit {
  factura!:Factura;
  selectedFactura$ = this.pasarFactura.selectedFactura$;
  constructor(private pasarFactura:FacturaService, private router:Router) { }

  ngOnInit(): void {
  }
  validarFacturaClick(val:boolean){
    this.pasarFactura.setValidarFactura(val);
    this.router.navigate(['facturacion/ingresar']);
  }
}
