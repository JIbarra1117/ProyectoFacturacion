import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteI } from 'src/app/Datos/claseCliente';

@Component({
  selector: 'app-seleccionar-clientes',
  templateUrl: './seleccionar-clientes.component.html',
  styleUrls: ['./seleccionar-clientes.component.css']
})
export class SeleccionarClientesComponent implements OnInit {

  dataSource = new MatTableDataSource<ClienteI>([]);
  displayedColumns = ['Cedula','Nombres','Apellidos','Teléfono','Domicilio'];
  constructor() { }
  ngOnInit(): void {
  }

  encontrarCliente(cliente:ClienteI){
    
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
