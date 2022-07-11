//import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
//Decodificar el token
import decode from 'jwt-decode';
import { min } from 'rxjs';
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
            {name:"Facturas pendientes",route:"examinar",icon:"fact_check"},
            {name:"Ingresar Ventas",route:"ingresar",icon:"data_thresholding"},
            {name:"Ingresar empleado",route:"empleados",icon:"person_add"},
            {name:"Inventario",route:"inventraio",icon:"inventory_2"},
            {name:"Cliente",route:"clientes",icon:"inventory_2"});
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


    //Prueba de reloj
  function actual() {
    let fecha=new Date(); //Actualizar fecha.
    let hora=fecha.getHours(); //hora actual
    let minuto=fecha.getMinutes(); //minuto actual
    let segundo=fecha.getSeconds(); //segundo actual
    let horaAux='',minAux='',segAux='';
    if (hora<10) { //dos cifras para la hora
      horaAux="0"+hora;
    }else{
      horaAux=hora.toString();
    }
    if (minuto<10) { //dos cifras para el minuto
        minAux="0"+minuto;
        }else{
          minAux=minuto.toString();
        }
    if (segundo<10) { //dos cifras para el segundo
        segAux="0"+segundo;
        }else{
          segAux=segundo.toString();
        }
    //ver en el recuadro del reloj:
    var mireloj = horaAux+" : "+minAux+" : "+segAux;	
    return mireloj; 
    }
  function actualizar() { //función del temporizador
    var mihora=actual(); //recoger hora actual
    var mireloj=document.getElementById("reloj"); //buscar elemento reloj
    if(mireloj!=null)
      mireloj.innerHTML=mihora; //incluir hora en elemento
    
  }
setInterval(actualizar,1000); //iniciar temporizador
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
