import { Component, OnInit } from '@angular/core';
import { VentasQueries } from '../../services/queries/ventas';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../../interfaces/venta.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventas!: Venta[];
  ventasLength: number = 0;
  take: number = 5;
  page: number = 1;
  search: string = '';
  sort: number = -1;
  vnQu: VentasQueries = new VentasQueries(this.http);

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
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
    this.router.navigate(['/ventas/punto-venta']);
  }

  obtenerVentas() {
    this.vnQu.obtenerVentas(this.take, this.page, this.search).subscribe({
      next: (response: any) => {
        this.ventasLength = response.pagination.totalResults;
        this.ventas = response.data;
      },
      error: (error) => {
        console.error('Error al obtener la lista de ventas:', error);
      }
    });
  }

  editarVenta(venta: Venta) {
    this.vnQu.editarVenta(venta).subscribe({
      next: (response: any) => {
      },
      error: (error) => {
        console.error('Error al editar venta:', error);
      }
    })
  }

  eliminarVenta(id: number) {
    this.vnQu.eliminarVenta(id).subscribe({
      next: (response: any) => {
        this.obtenerVentas();
        this.toastr.success('Se ha eliminado la venta', 'Eliminada');
      },
      error: (error) => {
        console.error('Error al eliminar la venta:', error);
      }
    })
  }

  toggleDate() {
    this.sort = -this.sort;
    this.ventas = this.ventas.sort((a: Venta, b: Venta) => {
      if (a.fecha < b.fecha) {
        return this.sort;
      } else if (a.fecha > b.fecha) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  toggleNom() {
    this.sort = -this.sort;
    this.ventas = this.ventas.sort((a: Venta, b: Venta) => {
      const nombreA = a.cliente!.nombre.toLowerCase();
      const nombreB = b.cliente!.nombre.toLowerCase();

      if (nombreA < nombreB) {
        return this.sort;
      } else if (nombreA > nombreB) {
        return -this.sort;
      } else {
        return 0;
      }
    });
  }

  toggleImp() {
    this.sort = -this.sort;
    this.ventas = this.ventas.sort((a: Venta, b: Venta) => {
      const aImp: number = parseInt(a.importe_total.toString());
      const bImp: number = parseInt(b.importe_total.toString());
      if (aImp < bImp) {
        return this.sort;
      } else if (aImp > bImp) {
        return -this.sort;
      } else {
        return 0;
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