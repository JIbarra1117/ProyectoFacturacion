import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteI } from 'src/app/Datos/claseCliente';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FacturaService } from 'src/app/servicios/dialogs/factura.service';

@Component({
  selector: 'app-seleccionar-clientes',
  templateUrl: './seleccionar-clientes.component.html',
  styleUrls: ['./seleccionar-clientes.component.css']
})
export class SeleccionarClientesComponent implements OnInit {
  //Valores para cargar el dataTable
  dataSource = new MatTableDataSource<ClienteI>([]);
  displayedColumns = ['Cedula','Nombres','Apellidos','Teléfono','Domicilio'];
  
  //Inicilizadores para el cliente
  initCliente:ClienteI={Apellido:'',Apellido2:'',Cedula:'',Domicilio:'',Nombre:'',Nombre2:'',Telefono:''};

  constructor(private dataClientes:ClientesService,
      private  enviarCliente:FacturaService,
      private _snackBar: MatSnackBar,
      private router:Router) { }
  
  
  ngOnInit(): void {
    this.obtenerClientes();
  }

  encontrarCliente(cliente:ClienteI){
    this.enviarCliente.setClienteFact(cliente);
    this.openSnackBar('Haz seleccionado al cliente: '+cliente.Nombre+' '+cliente.Apellido,'SI');
    this.reloadComponent();
  };

  obtenerClientes(){
    this.dataClientes.clientes().subscribe((valor:ClienteI[])=>{
      console.log(valor);
      this.dataSource.data=valor;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['facturacion/ingresar']);
  }
}
