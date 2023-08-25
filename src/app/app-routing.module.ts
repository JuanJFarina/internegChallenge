import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { LoggedComponent } from './layouts/logged/logged.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AppComponent,
    children: [{ path: '', component: LoginComponent }],
    canActivate: [LoginGuard]
  },
  {
    path: 'ventas',
    component: LoggedComponent,
    loadChildren: () => import('./views/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'clientes',
    component: LoggedComponent,
    loadChildren: () => import('./views/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'productos',
    component: LoggedComponent,
    loadChildren: () => import('./views/productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path: 'rubros',
    component: LoggedComponent,
    loadChildren:() => import('./views/rubros/rubros.module').then(m => m.RubrosModule)
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }