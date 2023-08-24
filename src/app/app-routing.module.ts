import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './views/clientes/clientes.component';
import { LoginComponent } from './views/login/login.component';
import { ProductosComponent } from './views/productos/productos.component';
import { PuntoVentaComponent } from './views/punto-venta/punto-venta.component';
import { RubrosComponent } from './views/rubros/rubros.component';
import { VentasComponent } from './views/ventas/ventas.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoggedComponent } from './layouts/logged/logged.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login', component: AppComponent, children: [
      { path: '', component: LoginComponent }
    ], canActivate: [LoginGuard]
  },

  {
    path: 'ventas', component: LoggedComponent, children: [
      { path: '', component: VentasComponent }
    ], canActivate: [AuthGuard]
  },

  {
    path: 'clientes', component: LoggedComponent, children: [
      { path: '', component: ClientesComponent }
    ], canActivate: [AuthGuard]
  },

  {
    path: 'productos', component: LoggedComponent, children: [
      { path: '', component: ProductosComponent }
    ], canActivate: [AuthGuard]
  },

  {
    path: 'rubros', component: LoggedComponent, children: [
      { path: '', component: RubrosComponent }
    ], canActivate: [AuthGuard]
  },

  {
    path: 'punto-venta', component: LoggedComponent, children: [
      { path: '', component: PuntoVentaComponent }
    ], canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }