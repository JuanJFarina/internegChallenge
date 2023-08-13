import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'punto-venta', component: PuntoVentaComponent },
  { path: 'abm-clientes', component: ClientesComponent },
  { path: 'abm-rubros', component: RubrosComponent },
  { path: 'abm-productos', component: ProductosComponent },
  // Agrega más rutas según las necesidades de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }