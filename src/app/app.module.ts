import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de importar el módulo de enrutamiento

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ProductosComponent } from './productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuntoVentaComponent,
    ClientesComponent,
    RubrosComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Agrega el módulo de enrutamiento aquí
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }