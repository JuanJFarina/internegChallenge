import { Component, OnInit } from '@angular/core';
import { VentasQueries } from '../services/queries/ventas';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../interfaces/venta.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventas!: any[];
  ventasLength: number = 0;
  take: number = 5;
  page: number = 1;
  search: string = '';
  sort: number = -1;
  clQu: VentasQueries = new VentasQueries(this.http);

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.obtenerVentas();
  }

  abrirModal(ver: boolean, type: string, item: Venta) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.onlyView = ver;
    modalRef.componentInstance.itemType = type;
    modalRef.componentInstance.save.subscribe((savedItem: Venta) => {
      this.editarVenta(savedItem);
    });
  }

  aPuntoVenta() {
    this.router.navigate(['/punto-venta']);
  }

  obtenerVentas() {
    this.clQu.obtenerVentas(this.take, this.page, this.search).subscribe({
      next: (response: any) => {
        this.ventasLength = response.pagination.totalResults;
        this.ventas = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de ventas:', error);
      }
    });
  }

  crearVenta(venta: any) {
    this.clQu.crearVenta(venta).subscribe({
      next: (response: any) => {
        console.log(response);
        this.obtenerVentas();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al crear venta:', error);
      }
    })
  }

  editarVenta(venta: Venta) {
    this.clQu.editarVenta(venta).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al editar venta:', error);
      }
    })
  }

  eliminarVenta(id: number) {
    this.clQu.eliminarVenta(id).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa, por ejemplo, actualizar la lista de ventas
        this.obtenerVentas();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al eliminar la venta:', error);
      }
    })
  }

  pageBack() {
    this.page--;
    this.obtenerVentas();
  }

  pageForw() {
    this.page++;
    this.obtenerVentas();
  }
}