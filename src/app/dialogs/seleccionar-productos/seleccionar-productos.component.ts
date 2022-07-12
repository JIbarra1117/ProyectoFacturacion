import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoI } from 'src/app/Datos/claseProducto';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { IngresarProductoComponent } from '../ingresar-producto/ingresar-producto.component';

@Component({
  selector: 'app-seleccionar-productos',
  templateUrl: './seleccionar-productos.component.html',
  styleUrls: ['./seleccionar-productos.component.css']
})


export class SeleccionarProductosComponent implements OnInit {
  //Inicializadores
    //Producto
      initProducto:ProductoI={IDFactVenta:0,IDProducto:0,Imagen:0,Precio:0,Producto:'',Stock:0};
  //Datasource para cargar productosen en la lista
  dataSource = new MatTableDataSource<ProductoI>([]);
  displayedColumns = ['Cod','Producto','Precio'];
  
  constructor(private productos:ProductosService,
    private facturaTransacciones:FacturaService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
      return this.productos.obtenerProductos().subscribe((productos:ProductoI[])=>{
        console.log(productos);
        this.dataSource.data=productos;
      });
  }
  
  obtenerProducto(producto:ProductoI){
    //Enviar productoseleccionado
    this.initProducto=producto;
    this.facturaTransacciones.setProductoGeneral(producto);
    this.openDialog('0','0');
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(IngresarProductoComponent, {
      width: '35%',
      height:'35%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
