import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import {Usuario} from 'src/app/Datos/claseUsuarios';

//Decodificar el token
//import decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user={
    Cedula:'',
    Contra:''
  }
  public _usuarioFunctions:Usuario = new Usuario(0,"","","",0);
  //form:FormGroup | undefined;
  form!:FormGroup ;
  constructor( 
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder) {
   }
  ngOnInit(): void {
    this.form=this.fb.group({
      Cedula:['',[Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      Contra:['',[Validators.required,Validators.minLength(4), Validators.maxLength(20)]]
    });
  }


  login(){
    //Obtener el token del usuario
    //const token = localStorage.getItem('token');
    //Tipeo del usuario
    let usuario={Nombre:String,Apellido:String,Cedula:String,Rol:String};
    //console.log(this.user);
    //De esta forma accedo a los datos para logearse
    //if(!this._usuarioFunctions.validarCedula(this.user.Cedula)){
      
    this.authService.singin(this.user).subscribe((res:any) => {
      console.log('Haz sido autenticado correctamente');
      localStorage.setItem('token',res.token);
      this.router.navigate(['facturacion']);     
    });
    //console.log('form value', this.form?.value);
    
 // };

    /*if(token!=null){
      usuario= decode(token);
      //console.log(usuario.Nombre+' '+usuario.Apellido);
      switch(usuario.Rol.toString()){
        case 'Administrador':
          this.router.navigate(['administracion']);
          break;
        ;
        case 'Facturacion':
          this.router.navigate(['facturacion']);
          break;  
        ;
        case 'Inventario':
          this.router.navigate(['facturacion']);
          break;  
          ;
      }
    }else{
      //console.log('No se logró decodificar el TOKEN!!');
    }*/
  }
  async validarCedula(){
    return this._usuarioFunctions.validarCedula(this.user.Cedula);
  }

  

}
