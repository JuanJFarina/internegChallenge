import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ProductosComponent } from './productos/productos.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { ModalComponent } from './modal/modal.component';
import { VentasComponent } from './ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuntoVentaComponent,
    ClientesComponent,
    RubrosComponent,
    ProductosComponent,
    HeaderComponent,
    AsideComponent,
    ModalComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Agrega el módulo de enrutamiento aquí
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }