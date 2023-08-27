import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmComponent } from './abm.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PuntoVentaComponent } from '../punto-venta/punto-venta.component';

const routes: Routes = [
  {
    path: '',
    component: AbmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'punto-venta',
    component: PuntoVentaComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubrosRoutingModule { }