import { Component, OnInit } from '@angular/core';
import{FacturaService} from 'src/app/servicios/dialogs/factura.service';
import { Factura } from 'src/app/Datos/Facturas';
import { ProductoFactI, ProductoI } from 'src/app/Datos/claseProducto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoI } from 'src/app/Datos/claseUsuarios';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { ClienteI } from 'src/app/Datos/claseCliente';
//Inicializar la factura

export interface dataFac{
  
    IDFactura:string,
    IDCliente:string,
    IDTrabajador:string,
    Fecha:Date,
    Hora: string,
    Subtotal:string,
    Iva:string,
    Total:string,
    Pagado:string
  
}
@Component({
  selector: 'app-registrar-ventas',
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})
export class RegistrarVentasComponent implements OnInit {
  //Inicializadores para trabajar con facturacion
   initFactura:Factura={IDFactura:0,IDCliente:'',IDTrabajador:'',Fecha:new Date('00/0/0'),Hora:{hours:0,minutes:0},Pagado:false,Total:0,Subtotal:0,Iva:0.12};
   initProducto:ProductoI={IDFactVenta:0,IDProducto:0,Imagen:0,Precio:0,Producto:'',Stock:0};
   initEmpleado:EmpleadoI={Apellido:'',Cedula:'',Nombre:'',Rol:''};
   initCliente:ClienteI={Apellido:'',Cedula:'',Domicilio:'',Nombre:'',Telefono:'',Apellido2:'',Nombre2:''};

   listaProductos:ProductoFactI[]=[];
   //Para saber si la factura se traslada desde dialogo
   comprobarEdicion=false;

   //Variable para la datatable de productos
   displayedColumns: string[] = ['Producto', 'Cantidad', 'Precio','Importe'];
   dataSource = new MatTableDataSource<ProductoFactI>([]);


  constructor(
    private recibirFact:FacturaService, 
    private productosFac:ProductosService,
    private empleado:AuthService,
    private cliente:ClientesService
    )
    { 
    this.initFactura;
  }
  selectedFactura$ = this.recibirFact.selectedFactura$;
  
  ngOnInit(): void {  
    this.getFactura();
    this.obtenerProductos();
    this.getValFactEdit();
    this.obtenerEmpleado();
    this.obtenerCliente();
    if(!this.comprobarEdicion){
      this.initFactura={IDFactura:0,IDCliente:'',IDTrabajador:'',Fecha:new Date(Date.now()),Hora:{hours:new Date().getHours(),minutes:new Date().getMinutes()},Pagado:false,Total:0,Subtotal:0,Iva:0.12};
    }
  }


  obtenerFecha():string{
    var date=new Date(this.initFactura.Fecha);
    var data; 
    if(this.initFactura.IDFactura>0){
      data=date.getDate().toString()+'/'+date.getMonth().toString()+'/'+date.getFullYear().toString();
    }
    else{
      data='0-0-0';
  }
    return data;
  }

  validarData():dataFac{
    var data=this.initFactura;
    var valor={
      IDFactura:'',
      IDCliente:'',
      IDTrabajador:'',
      Fecha:new Date(),
      Hora: '',
      Subtotal:'',
      Iva:'',
      Total:'',
      Pagado:''
    };
   if(this.initFactura.IDFactura==0){
      return valor;
   }else{
    valor={
      IDFactura:data.IDCliente.toString(),
      IDCliente:data.IDCliente,
      IDTrabajador:data.IDTrabajador.toString(),
      Fecha:data.Fecha,
      Hora:data.Hora.hours+':'+data.Hora.minutes,
      Iva:data.Iva.toString(),
      Pagado:data.Pagado.toString(),
      Subtotal:data.Subtotal.toString(),
      Total:data.Total.toString(),
    }
    
      return valor;
   }
   
  }

  //Otorgar a variables iniciadores para la funcion de la facturacion
  otorgarFac(data:Factura){
    this.initFactura= data;
    console.log(this.initFactura);
  }
  otorgarValEditFacyt(data:boolean){
    this.comprobarEdicion=data;
  }
  otorgarEmpleado(data:EmpleadoI){
    this.initEmpleado=data;
  }
  otorgarCliente(data:ClienteI){
    this.initCliente=data;
  }
  

//Obtencion de los servicios API REST
  //Obtencion de datas compartidas desde el dialogo de facturas por pagar
  getFactura(){
    this.recibirFact.selectedFactura$.subscribe((fac:Factura)=>{
      this.otorgarFac(fac);
    });
  }
  getValFactEdit(){
    this.recibirFact.selectedValidarFatura$.subscribe((fac:boolean)=>{
      this.otorgarValEditFacyt(fac);
    });
  }
  //Fin de data de dialog

  obtenerEmpleado(){
      this.empleado.consultarEmpleado(this.initFactura.IDTrabajador).subscribe(
        (emp:EmpleadoI[])=>{
          console.log(emp);
          if(emp.length>0){
          this.otorgarEmpleado(emp[0]);
        }
        }
      );
  }
  obtenerProductos(){
    this.productosFac.obtenerProductosFactura(this.initFactura.IDFactura).subscribe((productos:ProductoFactI[])=>{
      console.log(productos);
      this.listaProductos=productos;
      this.dataSource.data= productos;
    });
  }  
  obtenerCliente(){
    this.cliente.obtenerCliente(this.initFactura.IDCliente).subscribe(
      (cliente:ClienteI[])=>{
        if(cliente.length>0){
          this.otorgarCliente(cliente[0]);
        }
      }
    );
  }
  
  /* Mejoramiento de datos que debvuelven nulls*/
  mejorarDataCliente():string{
    var data=this.initCliente;
    if(data.Nombre2 ==null){
      data.Nombre2='';
    }
    if(data.Apellido2 ==null){
      data.Apellido2='';
    }
    if(data.Telefono ==null){
      data.Telefono='';
    }
    if(data.Domicilio ==null){
      data.Domicilio='';
    }

    return data.Nombre+' '+data.Nombre2+' '+data.Apellido+' '+data.Apellido2;
  }

   calcularSubTotal(){
      var resultado:number=0;
      
      for(let a of this.dataSource.data){
          resultado+=a.Cantidad*a.Precio;
      }
      console.log(resultado);
      return resultado.toFixed(2);
  }
  calcularTotal():string{
    var valorIva = (parseFloat(this.calcularSubTotal())*this.initFactura.Iva);
    var valorSubtotal = parseFloat(this.calcularSubTotal()+valorIva);
    return (valorIva+valorSubtotal).toFixed(2);
  }
  valorIvar(){
    return (parseFloat(this.calcularSubTotal())*this.initFactura.Iva).toFixed(2);
  }
}
