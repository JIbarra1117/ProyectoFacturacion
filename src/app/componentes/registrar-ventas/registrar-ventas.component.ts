import { Component, OnInit } from '@angular/core';
import{FacturaService} from 'src/app/servicios/dialogs/factura.service';
import { Factura } from 'src/app/Datos/Facturas';
import { ProductoI } from 'src/app/Datos/claseProducto';
//Inicializar la factura

export interface dataFac{
  
    IDFactura:string,
    IDCliente:string,
    IDTrabajador:string,
    Fecha:Date|string,
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
   initFactura:Factura={IDFactura:0,IDCliente:'',IDTrabajador:'',Fecha:new Date('00/0/0'),Hora:{hours:0,minutes:0},Pagado:false,Total:0,Subtotal:0,Iva:0.12};
   initProducto:ProductoI={IDProducto:0,Imagen:0,Precio:0,Producto:'',Stock:0};
   comprobarEdicion=false;
  constructor(private recibirFact:FacturaService) { }
  selectedFactura$ = this.recibirFact.selectedFactura$;
  
  ngOnInit(): void {  
    this.getFactura();
    this.getValFactEdit();
    if(!this.comprobarEdicion){
      this.initFactura={IDFactura:0,IDCliente:'',IDTrabajador:'',Fecha:new Date(Date.now()),Hora:{hours:new Date().getHours(),minutes:new Date().getMinutes()},Pagado:false,Total:0,Subtotal:0,Iva:0.12};
    }
  }

  validarData():dataFac{
    var data=this.initFactura;
    var valor={
      IDFactura:'',
      IDCliente:'',
      IDTrabajador:'',
      Fecha:'',
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
      Fecha:data.Fecha.toString(),
      Hora:data.Hora.hours+':'+data.Hora.minutes,
      Iva:data.Iva.toString(),
      Pagado:data.Pagado.toString(),
      Subtotal:data.Subtotal.toString(),
      Total:data.Total.toString(),
    }
      return valor;
   }
   
  }

  //Obtencion de datas compartidas desde el dialogo de facturas por pagar
  getFactura(){
    this.recibirFact.selectedFactura$.subscribe((fac:Factura)=>{
      this.otorgarFac(fac);
    });
  }
  otorgarFac(data:Factura){
    this.initFactura= data;
    console.log(this.initFactura);
  }
  getValFactEdit(){
    this.recibirFact.selectedValidarFatura$.subscribe((fac:boolean)=>{
      this.otorgarValEditFacyt(fac);
    });
  }

  otorgarValEditFacyt(data:boolean){
    this.comprobarEdicion=data;
  }
}
