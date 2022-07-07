import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import {Usuario} from 'src/app/Datos/claseUsuarios';

//Decodificar el token
//import decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

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
  userAux = this.user;
  public _usuarioFunctions:Usuario = new Usuario(0,"","","",0);
  //form:FormGroup | undefined;
  form!:FormGroup ;
  constructor( 
    //private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder) {
   }
  ngOnInit(): void {
    this.form=this.fb.group({
      Ced:['',[Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^-?(0|[1-9]\d*)?$/)/*,this.controlValuesCedula(this.user.Cedula)*/]],
      Contra:['',[Validators.required,Validators.minLength(4), Validators.maxLength(20)]]
    },{
      validators: this.controlValuesCedula()
    });
  }


  login(){
    //Obtener el token del usuario
    //const token = localStorage.getItem('token');
    //Tipeo del usuario
    let usuario={Nombre:String,Apellido:String,Cedula:String,Rol:String};
    //console.log(this.user);
    //De esta forma accedo a los datos para logearse
      
    this.authService.singin(this.user).subscribe((res:any) => {
      //console.log('Haz sido autenticado correctamente');
      //console.log(this.user);
      localStorage.setItem('token',res.token);
      if(localStorage.getItem('token')== undefined){
          console.log('El token es: '+localStorage.getItem('token'));
      }else{
        this.router.navigate(['facturacion']);
      }     
    });
  }
  private controlValuesCedula(/*cedula:string*/):ValidatorFn{
    return (control:AbstractControl):ValidationErrors| null=>{
      const FormGroup = control as FormGroup
      //console.log(cedula);
      //const valueOfControlB = FormGroup.get(cedula)?.value;
      if(!this._usuarioFunctions.validarCedula(this.user.Cedula)){
        return {valuesDoNotMach:false};
      }else{
        return{valuesDoNotMach:true}
      }
    }
  }

  

}
