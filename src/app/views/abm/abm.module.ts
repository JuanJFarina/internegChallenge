import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RubrosRoutingModule } from './abm-routing.module';
import { AbmComponent } from './abm.component';
import { PuntoVentaComponent } from '../punto-venta/punto-venta.component';


@NgModule({
  declarations: [
    AbmComponent,
    PuntoVentaComponent
  ],
  imports: [
    CommonModule,
    RubrosRoutingModule,
    FormsModule
  ]
})
export class AbmModule { }