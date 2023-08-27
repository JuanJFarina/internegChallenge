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
    path: 'in',
    component: LoggedComponent,
    children: [
      {
        path: 'ventas', loadChildren: () => import('./views/abm/abm.module').then(m => m.AbmModule)
      },
      {
        path: 'clientes', loadChildren: () => import('./views/abm/abm.module').then(m => m.AbmModule)
      },
      {
        path: 'productos', loadChildren: () => import('./views/abm/abm.module').then(m => m.AbmModule)
      },
      {
        path: 'rubros', loadChildren:() => import('./views/abm/abm.module').then(m => m.AbmModule)
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
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }