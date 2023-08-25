import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubrosComponent } from './rubros.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RubrosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubrosRoutingModule { }