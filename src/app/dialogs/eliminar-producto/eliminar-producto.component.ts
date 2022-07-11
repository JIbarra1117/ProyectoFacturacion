import { Component, OnInit } from '@angular/core';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  initProducto:ProductoFactI={IDFactura:0,IDProducto:0,Cantidad:0,Precio:0,Producto:''};
  constructor(private prod:FacturaService) { }
  producto$= this.prod.selectedProducto$;
  ngOnInit(): void {
    console.log(this.producto$);
  }
  getProducto(){
    return this.prod.selectedProducto$.subscribe((valor:ProductoFactI)=>{
      this.initProducto=valor;
    });

  }
}
