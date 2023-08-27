import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }