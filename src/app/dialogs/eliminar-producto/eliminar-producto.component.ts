import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';
import { FacturasService } from 'src/app/servicios/facturas.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  initProducto:ProductoFactI={IDFactura:0,IDProducto:0,Cantidad:0,Precio:0,Producto:''};
  constructor(private prod:FacturaService,
    private factProd:FacturasService,
    private router:Router) { }
  producto$= this.prod.selectedProducto$;
  ngOnInit(): void {
    this.getProducto();
  }
  getProducto(){
    return this.prod.selectedProducto$.subscribe((valor:ProductoFactI)=>{
      this.initProducto=valor;
    });
  }
  confirmarEliminacion(){
    this.factProd.eliminarProductoFact(this.initProducto.IDFactura, this.initProducto.IDProducto)
    .subscribe((val:boolean)=>{
      console.log(this.initProducto.IDFactura+':'+this.initProducto.IDProducto);
      console.log(val);
    });
    this.reloadComponent();
  }
  reloadComponent() {
    //let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['facturacion/ingresar']);
  }
}
