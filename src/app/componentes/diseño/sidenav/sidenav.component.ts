//import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
//Decodificar el token
import decode from 'jwt-decode';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  //Obtener el token para datos del usuario
  token = localStorage.getItem('token');
  usuario={Nombre:String,Apellido:String,Cedula:String,Rol:String};
  fillerNav = [{name:"Home",route:"/facturacion",icon:"home"}];

  ngOnInit(): void {
    if(this.token!=null){
      this.usuario= decode(this.token);
      //console.log(usuario.Nombre+' '+usuario.Apellido);
      switch(this.usuario.Rol.toString()){
        case 'Administrador':
          this.fillerNav.push(
            {name:"Examinar Ventas",route:"examinar",icon:"fact_check"},
            {name:"Ingresar Ventas",route:"ingresar",icon:"data_thresholding"},
            {name:"Ingresar empleado",route:"ingresar",icon:"person_add"},
            {name:"Inventario",route:"ingresar",icon:"inventory_2"});
          break;
        case 'Facturacion':
          this.fillerNav.push(
            {name:"Examinar Ventas",route:"examinar",icon:"fact_check"},
            {name:"Ingresar Ventas",route:"ingresar",icon:"data_thresholding"});
          break;
        case 'Inventario':
         /* this.fillerNav.push(
            {name:"Examinar Ventas",route:"examinar",icon:"fact_check"},
            {name:"Ingresar Ventas",route:"ingresar",icon:"data_thresholding"});
          */
          break;
      }
    }
  }



  mobileQuery: MediaQueryList;

  
  private _mobileQueryListener: () => void;

  constructor(
    //private router:Route,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private route:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  cerrarSesion(){
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
  //shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  shouldRun= true;
}
