import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';
import { Factura, FacturaAux } from 'src/app/Datos/Facturas';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoI, idAux } from 'src/app/Datos/claseUsuarios';
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
import decode from 'jwt-decode';
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
  //Inicializadores para validar botones
  btnNuevaFactura!:boolean;
  btnIngresoCliente!:boolean;
  btnIngresoProductos!:boolean;
  btnFacturar!:boolean;
  //Inicializadores para trabajar con facturacion
  initFactura: Factura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('0/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
  initFacturaAux: Factura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('0/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
  initProducto: ProductoI = { IDFactVenta: 0, IDProducto: 0, Imagen: 0, Precio: 0, Producto: '', Stock: 0 };
  initEmpleado: EmpleadoI = { Apellido: '', Cedula: '', Nombre: '', Rol: '' };
  initCliente: ClienteI = { Apellido: '', Cedula: '', Domicilio: '', Nombre: '', Telefono: '', Apellido2: '', Nombre2: '' };
  idEmpleado!:idAux;
  idNumFacturaIngresada!:number;
  listaProductos: ProductoFactI[] = [];
  //Para saber si la factura se traslada desde dialogo
  comprobarEdicion = false;
  validarCliente=true;
  //Variable para la datatable de productos
  displayedColumns: string[] = ['IDProducto','Producto', 'Cantidad', 'Precio', 'Importe','Acciones'];
  dataSource = new MatTableDataSource<ProductoFactI>([]);
  //ValidarObservables
  dataValidadroa = true;
  //Para eliminacion de producto
  clickedRows = new Set<ProductoI>();
  //cliente Nuevo
  $cliente=this.recibirFact.selectedClienteFact$;
  selectedFactura$ = this.recibirFact.selectedFactura$;
  //Decodificar token con este usuario
  usuario!:EmpleadoI;
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

  ngOnInit(): void {
    this.getFacturaAux();
    this.validarFacturacionBtn();
    if(this.initFacturaAux.Pagado==false){
      console.log(this.initFactura.Pagado);
      this.validarFacturacionBtn();
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
  otorgarClienteNuevo(data: ClienteI) {
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
      this.validarFacturacionBtn();
    });
  }

  getFacturaAux() {
    return this.recibirFact.selectedFactura$.subscribe((fac: Factura) => {
      //if(this.dataValidadroa){
        console.log(fac);
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
            console.log('CLIENTE:'+cliente);
            this.otorgarCliente(cliente[0]);
          }
        } else { }

      }
    );
  }

  /* Mejoramiento de datos que debvuelven nulls*/
  mejorarDataCliente(): string {
    if(this.initFactura.IDFactura==0 && this.validarCliente==true){
      this.obtnerNuevoCliente();}
    var data = this.initCliente;
    //console.log(data);
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

  obtnerNuevoCliente(){
    return this.$cliente.subscribe((cli:ClienteI)=>{
        this.initCliente= cli;
      });
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
    //var valorIva = (parseFloat(this.calcularSubTotal()) * this.initFactura.Iva);
    var valorSubtotal = parseFloat(this.calcularSubTotal() + this.valorIvar());
    return (parseFloat(this.valorIvar()) + valorSubtotal).toFixed(2);
  }
  valorIvar() {
    var total= parseFloat(this.calcularSubTotal());
    if(total>5){
      return (parseFloat(this.calcularSubTotal()) * this.initFactura.Iva).toFixed(2);
    }else{
    return (0).toFixed(2);
  }
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
      this.cargarClienteNuevo().unsubscribe();
      this.obtnerNuevoCliente().unsubscribe();
      
      this.dataSource.data = [];
      this.initFactura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('00/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
      this.initProducto = { IDFactVenta: 0, IDProducto: 0, Imagen: 0, Precio: 0, Producto: '', Stock: 0 };
      this.initEmpleado = { Apellido: '', Cedula: '', Nombre: '', Rol: '' };
      this.initCliente = { Apellido: '', Cedula: '', Domicilio: '', Nombre: '', Telefono: '', Apellido2: '', Nombre2: '' };
      
      this.openSnackBar('Facturacion con éxito!', 'Ok');
      this.transaccionExitosa();
      //this.reloadComponent();
    }
  }

  cancelar() {
    //    this.router.navigate(['facturacion/examinar']);
    if (this.initFactura.IDFactura == 0) {
      this.openSnackBar('No se puede Facturar!', 'Ok');
    } else {
      this.transaccionRechazada();
      this.dataValidadroa = false;//
      //this.reloadComponent();
      this.initFacturaAux.Pagado=true;
      this.recibirFact.setFactura(this.initFacturaAux);
      this.actualizarFac().unsubscribe();
      this.getFactura()?.unsubscribe();
      this.getFacturaAux().unsubscribe();
      this.obtenerProductos().unsubscribe();
      this.getValFactEdit().unsubscribe();
      this.obtenerEmpleado().unsubscribe();
      this.obtenerCliente().unsubscribe();
      this.cargarClienteNuevo().unsubscribe();
      this.obtnerNuevoCliente().unsubscribe();
      this.dataSource.data = [];
      this.initFactura = { IDFactura: 0, IDCliente: '', IDTrabajador: '', Fecha: new Date('0/0/0'), Hora: { hours: 0, minutes: 0 }, Pagado: false, Total: 0, Subtotal: 0, Iva: 0.12 };
      this.initProducto = { IDFactVenta: 0, IDProducto: 0, Imagen: 0, Precio: 0, Producto: '', Stock: 0 };
      this.initEmpleado = { Apellido: '', Cedula: '', Nombre: '', Rol: '' };
      this.initCliente = { Apellido: '', Cedula: '', Domicilio: '', Nombre: '', Telefono: '', Apellido2: '', Nombre2: '' };
      this.validarCliente=false;
      this.openSnackBar('Proceso Cancelado!', 'Ok');
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
    if(this.initFactura.IDFactura==0){
      var token = localStorage.getItem('token');
      if(token!=null){
        this.usuario= decode(token);
        this.initEmpleado=this.usuario;
        
      }
    }
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

  seleccionarProducto(){
    //this.recibirFact.setProducto(data);
    this.recibirFact.setNumFacturaProd(this.initFactura.IDFactura);
    this.recibirFact.setFactura(this.initFactura);
    this.openDialogProducto('0','0');
  }

  ventanaCliente(){
    this.openDialogClientes('0','0');
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
      width: '70%',
      height:'80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  
  openDialogClientes(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SeleccionarClientesComponent, {
      width: '80%',
      height:'60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  validarFacturacionBtn(){
    this.btnIngresoCliente=true;
    this.btnIngresoProductos=true;
  }
  
  cargarClienteNuevo(){
    return this.recibirFact.selectedClienteFact$.subscribe((cliente:ClienteI)=>{
      console.log(cliente);
      this.otorgarCliente(cliente);
    });
  }
  otorgarIDFact(num:number){
    this.initFactura.IDFactura=num;
  }
  crearFactura(){
    this.abrirTransaccion();
    this.abrirPuntoSeguro();
    var fecha=new Date(Date.now());
     var factura:FacturaAux={Fecha:fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate(),Hora:fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds(),IDCliente:this.initCliente.Cedula,IDFactura:0,IDTrabajador:this.usuario.Cedula,Iva:0.12,Pagado:false,Subtotal:0,Total:0};
    
    this.fac.insertarFactura(factura).subscribe((numero:string)=>{
      console.log(parseFloat(numero));  
      this.otorgarIDFact(parseFloat(numero));
    });
    
    var facTransf: Factura = { IDFactura: this.idNumFacturaIngresada, IDCliente: this.initCliente.Cedula, IDTrabajador: this.usuario.Cedula, Fecha: new Date(factura.Fecha), Hora: { hours: parseInt(factura.Hora.substring(0,1)) , minutes: parseInt(factura.Hora.substring(3,4)) }, Pagado: factura.Pagado, Total: factura.Total, Subtotal: factura.Subtotal, Iva: 0.12 };
  //
    this.otorgarFac(facTransf);;
  }

  abrirTransaccion(){
    return this.fac.crearTransaccion();
  }
  abrirPuntoSeguro(){
    return this.fac.crearPuntoSeguro();
  }
  transaccionRechazada(){
    return this.fac.crearTransaccionRechazada();
  }
  transaccionExitosa(){
    return this.fac.transaccionSegura();
  }

}

export interface ProdAuxI{
  IDProducto:number,
  Producto:string,
  Cantidad:number,
  Precio:number,
}



