import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { CrearPrestamoComponent } from './prestamos/crear-prestamo/crear-prestamo.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';

const routes: Routes = [
  {path:'', component:DashboardComponent, children:[
    {path:'', component: InicioComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'reportes', component: ReportesComponent},
    {path:'crear-usuario', component:CrearUsuarioComponent},
    {path:'editar-usuario/:id', component:CrearUsuarioComponent},
    {path:'prestamos', component:PrestamosComponent},
    {path: 'crear-prestamo', component:CrearPrestamoComponent},
    {path: 'productos', component:ProductosComponent},
    {path: 'crear-producto', component:CrearProductoComponent},
    {path:'editar-producto/:id', component:CrearProductoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
