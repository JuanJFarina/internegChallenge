import { Component, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isOpen: boolean = false;
  @ViewChild('mobileMenu', { static: false }) mobileMenu!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) { }

  closeMenuIfClickedOutside(event: any) {
    if (!this.mobileMenu.nativeElement.contains(event.target) && (event.target != 'li' || event.target != 'ul')) {
      this.isOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    this.closeMenuIfClickedOutside(event);
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    this.isOpen = false;
  }

  aVentas() {
    this.router.navigate(['/in/ventas']);
    this.isOpen = false;
  }

  aClientes() {
    this.router.navigate(['/in/clientes']);
    this.isOpen = false;
  }

  aProductos() {
    this.router.navigate(['/in/productos']);
    this.isOpen = false;
  }

  aRubros() {
    this.router.navigate(['/in/rubros']);
    this.isOpen = false;
  }
}
