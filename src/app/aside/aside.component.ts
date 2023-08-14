import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  enRutaLogin!: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.enRutaLogin = event.url === '/login';
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  aVentas() {
    this.router.navigate(['/punto-venta']);
  }

  aClientes() {
    this.router.navigate(['/clientes']);
  }

  aProductos() {
    this.router.navigate(['/productos']);
  }

  aRubros() {
    this.router.navigate(['/rubros']);
  }
}