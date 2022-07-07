import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Decodificar el token
import decode from 'jwt-decode';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
   usuario={Nombre:String,Apellido:String,Cedula:String,Rol:String};
   token = localStorage.getItem('token');
  constructor(
    private router:Router
  ) { 
    if(this.token!=null)
    this.usuario= decode(this.token);
  }

  ngOnInit(): void {
  }
  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
