import { Component, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import {Factura,OperacionesFacturas} from 'src/app/Datos/Facturas';
import {FacturasService} from 'src/app/servicios/facturas.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FacturaSeleccionadaComponent } from 'src/app/dialogs/factura-seleccionada/factura-seleccionada.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FacturaService} from 'src/app/servicios/dialogs/factura.service';

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
   Pagado=false;
   facturasPagada: Factura[]=[];
   displayedColumns: string[] = ['IDFactura', 'IDTrabajador', 'IDCliente', 'Fecha','Hora','Subtotal','Total'];
   clickedRows = new Set<Factura>();
  //Variables para la carga de datos en DataTable
   dataSource = new MatTableDataSource<Factura>([]);
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   //Pasar data a otro componente
   facturaEntrante!:Factura;
   selectedValFactura$ = this.pasarFactura.selectedValidarFatura$;
  constructor(private opFac:FacturasService, public dialog: MatDialog, private pasarFactura:FacturaService) { 
    //this.dataSource = new MatTableDataSource(this.facturaTipeada);
  }
  ngOnInit(): void {
    this.obtenerFacturasPagadas();
    //this.pasarFactura.selectedFactura$.subscribe((factura:Factura) => this.facturaEntrante=factura);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FacturaSeleccionadaComponent, {
      width: '50%',
      height:'75%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  validarData(a:Factura){
    var data:boolean=true;
    this.pasarFactura.setFactura(a);
    this.openDialog('0ms', '0ms');
    this.pasarFactura.selectedValidarFatura$.subscribe((resultado:boolean)=>{
      data=resultado;

    });
  }

  obtenerFacturasPagadas(){
    this.opFac.obtenerFacturasPagadas(this.Pagado).subscribe((res:Factura[]) => {
      if(res.length>0){
        //console.log(typeof dataRes);
        this.dataSource.data = res||[];
      }else{
        console.log('No hay facturas pagadaas...');
      }
    });
  }

  cambiarDataFecha(fecha: string): string {
    var año, mes, dia;
    año = fecha.substring(0, 4);
    mes = fecha.substring(5, 7);
    dia = fecha.substring(8, 10);
    switch (parseInt(mes)) {
      case 1:
        return dia + '/Enero/' + año;
        ;
      case 2:
        return dia + '/Febrero/' + año;
        ;
      case 3:
        return dia + '/Marzo/' + año;
        ;
      case 4:
        return dia + '/Abril/' + año;
        ;
      case 5:
        return dia + '/Mayo/' + año;
        ;
      case 6:
        return dia + '/Junio/' + año;
        ;
      case 7:
        return dia + '/Julio/' + año;
        ;
      case 8:
        return dia + '/Agosto/' + año;
        ;
      case 9:
        return dia + '/Septiembre/' + año;
        ;
      case 10:
        return dia + '/Octubre/' + año;
        ;
      case 11:
        return dia + '/Noviembre/' + año;
        ;
      case 12:
        return dia + '/Diciembre/' + año;
        ;
      default:
        return año + ' ' + mes + ' ' + dia;
    }
  }
}

