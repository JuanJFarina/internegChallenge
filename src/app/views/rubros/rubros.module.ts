import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RubrosRoutingModule } from './rubros-routing.module';
import { RubrosComponent } from './rubros.component';


@NgModule({
  declarations: [RubrosComponent],
  imports: [
    CommonModule,
    RubrosRoutingModule,
    FormsModule
  ]
})
export class RubrosModule { }
