import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from '../../views/clientes/clientes.component';
import { LoginComponent } from '../../views/login/login.component';
import { ProductosComponent } from '../../views/productos/productos.component';
import { PuntoVentaComponent } from '../../views/punto-venta/punto-venta.component';
import { RubrosComponent } from '../../views/rubros/rubros.component';
import { VentasComponent } from '../../views/ventas/ventas.component';
import { AuthGuard } from '../../guards/auth.guard';
import { LoginGuard } from '../../guards/login.guard';
import { PageNotFoundComponent } from '../../views/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'rubros', component: RubrosComponent, canActivate: [AuthGuard] },
  { path: 'punto-venta', component: PuntoVentaComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }