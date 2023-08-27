import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }