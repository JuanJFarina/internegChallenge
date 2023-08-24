import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggedRoutingModule } from './logged-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../views/login/login.component';
import { PuntoVentaComponent } from '../../views/punto-venta/punto-venta.component';
import { ClientesComponent } from '../../views/clientes/clientes.component';
import { RubrosComponent } from '../../views/rubros/rubros.component';
import { ProductosComponent } from '../../views/productos/productos.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AsideComponent } from '../../components/aside/aside.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { VentasComponent } from '../../views/ventas/ventas.component';
import { PageNotFoundComponent } from '../../views/page-not-found/page-not-found.component';
import { LoggedLayoutComponent } from '../../layouts/logged-layout/logged-layout.component';

@NgModule({
  declarations: [
    LoggedLayoutComponent,
    LoginComponent,
    PuntoVentaComponent,
    ClientesComponent,
    RubrosComponent,
    ProductosComponent,
    HeaderComponent,
    AsideComponent,
    ModalComponent,
    VentasComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    LoggedRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LoggedLayoutComponent]
})
export class LoggedModule { }