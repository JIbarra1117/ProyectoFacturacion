import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FacturacionComponent } from './componentes/facturacion/facturacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {AdministracionComponent} from './componentes/administracion/administracion.component';
import { RolesGuard } from './guards/roles.guard';
import {SidenavComponent} from './componentes/diseño/sidenav/sidenav.component';
import {RegistrarVentasComponent} from './componentes/registrar-ventas/registrar-ventas.component';
import {ExaminarVentasComponent} from './componentes/examinar-ventas/examinar-ventas.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'facturacion',component:SidenavComponent,canActivate:[AuthGuard],
    children:[
      {path:"", component: FacturacionComponent, canActivate:[AuthGuard]},
      {path:"examinar", component: ExaminarVentasComponent, canActivate:[AuthGuard]},
      {path:"ingresar", component: RegistrarVentasComponent, canActivate:[AuthGuard]}
    ]},
  {path:'administracion', component:AdministracionComponent, canActivate:[AuthGuard,RolesGuard],data:{expectedRole:'Administrador'},
    children:[
      {path:"facturacion", component: FacturacionComponent, canActivate:[AuthGuard]}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
