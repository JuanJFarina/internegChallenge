import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';

@NgModule({
  declarations: [ProductosComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule
  ]
})
export class ProductosModule { }
