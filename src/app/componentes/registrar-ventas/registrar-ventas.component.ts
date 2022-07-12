import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';
import { Factura } from 'src/app/Datos/Facturas';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoI } from 'src/app/Datos/claseUsuarios';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { ClienteI } from 'src/app/Datos/claseCliente';
import { Router } from '@angular/router';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, take } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import { EliminarProductoComponent } from 'src/app/dialogs/eliminar-producto/eliminar-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionarProductosComponent } from 'src/app/dialogs/seleccionar-productos/seleccionar-productos.component';
import { SeleccionarClientesComponent } from 'src/app/dialogs/seleccionar-clientes/seleccionar-clientes.component';
//Inicializar la factura

export interface dataFac {

  IDFactura: string,
  IDCliente: string,
  IDTrabajador: string,
  Fecha: Date,
  Hora: string,
  Subtotal: string,
  Iva: string,
  Total: string,
  Pagado: string

}
@Component({
  selector: 'app-registrar-ventas',
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})
export class RegistrarVentasComponent implements OnInit {
  //Inicializadores para trabajar con facturacion
  initFactura: Factura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('0/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
  initFacturaAux: Factura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('0/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
  initProducto: ProductoI = { IDFactVenta: 0, IDProducto: 0, Imagen: 0, Precio: 0, Producto: '', Stock: 0 };
  initEmpleado: EmpleadoI = { Apellido: '', Cedula: '', Nombre: '', Rol: '' };
  initCliente: ClienteI = { Apellido: '', Cedula: '', Domicilio: '', Nombre: '', Telefono: '', Apellido2: '', Nombre2: '' };

  listaProductos: ProductoFactI[] = [];
  //Para saber si la factura se traslada desde dialogo
  comprobarEdicion = false;

  //Variable para la datatable de productos
  displayedColumns: string[] = ['IDProducto','Producto', 'Cantidad', 'Precio', 'Importe','Acciones'];
  dataSource = new MatTableDataSource<ProductoFactI>([]);
  //ValidarObservables
  dataValidadroa = true;
  //Para eliminacion de producto
  clickedRows = new Set<ProductoI>();


  constructor(
    private recibirFact: FacturaService,
    private productosFac: ProductosService,
    private empleado: AuthService,
    private cliente: ClientesService,
    private router: Router,
    private fac: FacturasService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }
  selectedFactura$ = this.recibirFact.selectedFactura$;
  dataValidar = false;
  ngOnInit(): void {
    this.getFacturaAux();
    if(this.initFacturaAux.Pagado==false){
      console.log(this.initFactura.Pagado);
      this.validarcargaDeFactura();
      this.getValFactEdit();
      this.obtenerProductos();
      this.obtenerEmpleado();
      this.obtenerCliente();
    }

  }
  validarcargaDeFactura() {
    //console.log(this.initFacturaAux.Pagado);
    if (this.initFacturaAux.Pagado == false) {
      console.log(this.initFacturaAux);
      this.initFactura = this.initFacturaAux;
    }
  }

  obtenerFecha(): string {

    var date = new Date(this.initFactura.Fecha);
    var dateA = new Date(Date.now());
    var data;
    if (this.initFactura.IDFactura > 0 && this.initFactura.IDFactura != null) {
      return date.getDate().toString() + '/' + date.getMonth().toString() + '/' + date.getFullYear().toString();
    }
    else {
      return dateA.getDate() + '/' + dateA.getMonth() + '/' + dateA.getFullYear();
    }
  }

  validarData(): dataFac {
    var data = this.initFactura;
    var valor = {
      IDFactura: '',
      IDCliente: '',
      IDTrabajador: '',
      Fecha: new Date(),
      Hora: '',
      Subtotal: '',
      Iva: '',
      Total: '',
      Pagado: ''
    };
    if (this.initFactura.IDFactura == 0) {
      return valor;
    } else {
      valor = {
        IDFactura: data.IDCliente.toString(),
        IDCliente: data.IDCliente,
        IDTrabajador: data.IDTrabajador.toString(),
        Fecha: data.Fecha,
        Hora: data.Hora.hours + ':' + data.Hora.minutes,
        Iva: data.Iva.toString(),
        Pagado: data.Pagado.toString(),
        Subtotal: data.Subtotal.toString(),
        Total: data.Total.toString(),
      }

      return valor;
    }

  }

  //Otorgar a variables iniciadores para la funcion de la facturacion
  otorgarFac(data: Factura) {
    this.initFactura = data;
    //console.log(this.initFactura);
  }
  otorgarValEditFacyt(data: boolean) {
    this.comprobarEdicion = data;
  }
  otorgarEmpleado(data: EmpleadoI) {
    this.initEmpleado = data;
  }
  otorgarCliente(data: ClienteI) {
    this.initCliente = data;
  }

  otorgarFacturaAux(data: Factura) {
    this.initFacturaAux = data;
  }

  //Obtencion de los servicios API REST
  //Obtencion de datas compartidas desde el dialogo de facturas por pagar
  getFactura() {
    return this.recibirFact.selectedFactura$.subscribe((fac: Factura) => {
      if (fac.Pagado == false) { this.otorgarFac(this.initFacturaAux); }

    });
  }

  getFacturaAux() {
    return this.recibirFact.selectedFactura$.subscribe((fac: Factura) => {
      //if(this.dataValidadroa){
        if(fac.Pagado==false){
          this.otorgarFacturaAux(fac);
        }


    });
  }
  getValFactEdit() {
    return this.recibirFact.selectedValidarFatura$.subscribe((fac: boolean) => {
      if (this.dataValidadroa) {
        this.otorgarValEditFacyt(fac);
      }
      else { }

    });
  }
  //Fin de data de dialog

  obtenerEmpleado() {
    return this.empleado.consultarEmpleado(this.initFactura.IDTrabajador).subscribe(
      (emp: EmpleadoI[]) => {
        if (this.initFactura.Pagado==false) {
          console.log(emp);
          if (emp.length > 0) {
            this.otorgarEmpleado(emp[0]);
          }
        }
        else {

        }
      }
    );
  }
  obtenerProductos() {
    return this.productosFac.obtenerProductosFactura(this.initFactura.IDFactura).subscribe((productos: ProductoFactI[]) => {
      if (this.dataValidadroa) {
        console.log(productos);
        this.listaProductos = productos;
        this.dataSource.data = productos;
      } else {

      }
    });
  }
  obtenerCliente() {
    return this.cliente.obtenerCliente(this.initFactura.IDCliente).subscribe(
      (cliente: ClienteI[]) => {
        if (this.dataValidadroa) {
          if (cliente.length > 0) {
            this.otorgarCliente(cliente[0]);
          }
        } else { }

      }
    );
  }

  /* Mejoramiento de datos que debvuelven nulls*/
  mejorarDataCliente(): string {
    var data = this.initCliente;
    if (data.Nombre2 == null) {
      data.Nombre2 = '';
    }
    if (data.Apellido2 == null) {
      data.Apellido2 = '';
    }
    if (data.Telefono == null) {
      data.Telefono = '';
    }
    if (data.Domicilio == null) {
      data.Domicilio = '';
    }

    return data.Nombre + ' ' + data.Nombre2 + ' ' + data.Apellido + ' ' + data.Apellido2;
  }

  calcularSubTotal() {
    var resultado: number = 0;

    for (let a of this.dataSource.data) {
      resultado += a.Cantidad * a.Precio;
    }
    //console.log(resultado);
    return resultado.toFixed(2);
  }
  calcularTotal(): string {
    var valorIva = (parseFloat(this.calcularSubTotal()) * this.initFactura.Iva);
    var valorSubtotal = parseFloat(this.calcularSubTotal() + valorIva);
    return (valorIva + valorSubtotal).toFixed(2);
  }
  valorIvar() {
    return (parseFloat(this.calcularSubTotal()) * this.initFactura.Iva).toFixed(2);
  }

  clickActuFact() {
    //    this.router.navigate(['facturacion/examinar']);
    if (this.initFactura.IDFactura == 0) {
      this.openSnackBar('No se puede Facturar!', 'Ok');
    } else {
      this.dataValidadroa = false;
      //this.reloadComponent();
      this.initFacturaAux.Pagado=true;
      this.recibirFact.setFactura(this.initFacturaAux);
      this.actualizarFac();
      this.getFactura()?.unsubscribe();
      this.getFacturaAux().unsubscribe();
      this.obtenerProductos().unsubscribe();
      this.getValFactEdit().unsubscribe();
      this.obtenerEmpleado().unsubscribe();
      this.obtenerCliente().unsubscribe();
      this.dataSource.data = [];
      this.initFactura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('00/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
      this.initProducto = { IDFactVenta: 0, IDProducto: 0, Imagen: 0, Precio: 0, Producto: '', Stock: 0 };
      this.initEmpleado = { Apellido: '', Cedula: '', Nombre: '', Rol: '' };
      this.initCliente = { Apellido: '', Cedula: '', Domicilio: '', Nombre: '', Telefono: '', Apellido2: '', Nombre2: '' };
      
      this.openSnackBar('Facturacion con éxito!', 'Ok');
      //this.reloadComponent();
    }
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


  actualizarFac() {
    return this.fac.actualizarFac(this.initFactura.IDFactura).subscribe(value => {
      console.log('Se cambio a pagado: ' + value);
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  numFac(): number {
    return this.initFactura.IDFactura;
  }
  nomEmpleado(): string {
    if(this.initFactura.Pagado==false)
      return this.initEmpleado.Nombre + ' ' + this.initEmpleado.Apellido
    else
    return '';
  }
  eliminarProducto(a:ProdAuxI){
    var data:ProductoFactI={ IDFactura:this.initFactura.IDFactura,IDProducto:a.IDProducto,Cantidad:a.Cantidad,Precio:a.Precio,Producto:a.Producto}
    this.recibirFact.setProducto(data);
    console.log(a);
    this.openDialog('0','0');
    //this.recibirFact.
  }
  editarProducto(a:ProdAuxI){
    var data:ProductoFactI={ IDFactura:0,IDProducto:a.IDProducto,Cantidad:a.Cantidad,Precio:a.Precio,Producto:a.Producto}
    this.recibirFact.setProducto(data);
    console.log(a);
    this.openDialogProducto('0','0');
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EliminarProductoComponent, {
      width: '40%',
      height:'40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogProducto(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SeleccionarProductosComponent, {
      width: '40%',
      height:'40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  
  openDialogClientes(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SeleccionarClientesComponent, {
      width: '40%',
      height:'40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

export interface ProdAuxI{
  IDProducto:number,
  Producto:string,
  Cantidad:number,
  Precio:number,

}
