import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';
import { FacturasService } from 'src/app/servicios/facturas.service';

@Component({
  selector: 'app-ingresar-producto',
  templateUrl: './ingresar-producto.component.html',
  styleUrls: ['./ingresar-producto.component.css']
})
export class IngresarProductoComponent implements OnInit {
  producto:ProductoI={IDFactVenta:0,IDProducto:0,Imagen:0,Precio:0,Producto:'',Stock:0};
  maximoCantidad!:number;
  numeroFactura=0;
  cantidadSeleccionada=0;
  constructor(
    private fact:FacturaService,
    private facturaTransaccion:FacturasService,
    private router:Router
  ) { }
    maximo():string{
      if(this.maximoCantidad>9){
          return '0'+this.maximoCantidad;
      }else{
        return this.maximoCantidad.toString();
      }
    }
  ngOnInit(): void {
    this.maximoCantidadIngreso();
    this.obtenerProducto();
    this.obtenerNumeroFactura();
  }
  
  maximoCantidadIngreso(){
    this.fact.selecteNumFacturaProducto$.subscribe(
      (val:number)=>{
        this.numeroFactura=val;
      }
    );
  }
  obtenerProducto(){
  this.fact.selectedProductoGeneral$.subscribe(
    (val:ProductoI)=>{
      this.producto=val;
      this.maximoCantidad=val.Stock;
    }
  );
  }
  obtenerNumeroFactura(){
    this.fact.selecteNumFacturaProducto$.subscribe(
      (val:number)=>{
        this.numeroFactura=val;
      }
    );
  }

  confirmaProducto(){
    this.facturaTransaccion.insertarProductosFactura(this.numeroFactura,this.producto.IDProducto,this.cantidadSeleccionada)
    .subscribe(
      (val:any)=>{console.log(val);}
    );
    console.log(this.maximoCantidad);
    this.reloadComponent();
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['facturacion/ingresar']);
  }
}
