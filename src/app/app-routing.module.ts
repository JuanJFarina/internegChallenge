import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { RubrosComponent } from './rubros/rubros.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'rubros', component: RubrosComponent, canActivate: [AuthGuard] },
  { path: 'punto-venta', component: PuntoVentaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }