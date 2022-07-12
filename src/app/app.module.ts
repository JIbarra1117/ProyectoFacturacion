import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Factura,OperacionesFacturas} from 'src/app/Datos/Facturas';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacturacionComponent } from './componentes/facturacion/facturacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {AdministracionComponent} from './componentes/administracion/administracion.component';
import {SidenavComponent} from './componentes/diseño/sidenav/sidenav.component';
import {ExaminarVentasComponent} from './componentes/examinar-ventas/examinar-ventas.component';
import { RegistrarVentasComponent } from './componentes/registrar-ventas/registrar-ventas.component';
import { CommonModule } from '@angular/common';
//Dialogs
import {FacturaSeleccionadaComponent} from './dialogs/factura-seleccionada/factura-seleccionada.component';
import{EliminarProductoComponent}from'./dialogs/eliminar-producto/eliminar-producto.component';
import{SeleccionarClientesComponent}from'./dialogs/seleccionar-clientes/seleccionar-clientes.component';
import{SeleccionarProductosComponent}from'./dialogs/seleccionar-productos/seleccionar-productos.component';
import { IngresarProductoComponent } from './dialogs/ingresar-producto/ingresar-producto.component';
//Modules
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//Providers
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    FacturacionComponent,
    LoginComponent,
    AdministracionComponent,
    SidenavComponent,
    ExaminarVentasComponent,
    FacturaSeleccionadaComponent,
    RegistrarVentasComponent,
    EliminarProductoComponent,
    SeleccionarClientesComponent,
    SeleccionarProductosComponent,
    IngresarProductoComponent
  ],
  entryComponents:[
    FacturaSeleccionadaComponent,
    EliminarProductoComponent,
    SeleccionarClientesComponent,
    SeleccionarProductosComponent,
    IngresarProductoComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    AngularMaterialModule,//Este modulo obtiene todo el diseño de angular material
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule 
  ],
  providers: [
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService//Ayuda a decodificar y codificar tokens desde el lado del servidor 
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
