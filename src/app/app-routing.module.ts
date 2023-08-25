import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { LoggedComponent } from './layouts/logged/logged.component';
import { AppComponent } from './app.component';
import { CustomRouteReuseStrategy } from './route-reuse-strategy';

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
    path: 'in',
    component: LoggedComponent,
    children: [
      {
        path: 'ventas', loadChildren: () => import('./views/ventas/ventas.module').then(m => m.VentasModule)
      },
      {
        path: 'clientes', loadChildren: () => import('./views/clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'productos', loadChildren: () => import('./views/productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'rubros', loadChildren:() => import('./views/rubros/rubros.module').then(m => m.RubrosModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }