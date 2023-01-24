import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { CrearPrestamoComponent } from './prestamos/crear-prestamo/crear-prestamo.component';
import { DetallePrestamoComponent } from './prestamos/detalle-prestamo/detalle-prestamo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    UsuariosComponent,
    NavbarComponent,
    ReportesComponent,
    CrearUsuarioComponent,
    PrestamosComponent,
    CrearPrestamoComponent,
    DetallePrestamoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
