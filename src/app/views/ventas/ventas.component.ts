import { Component, OnInit } from '@angular/core';
import { Venta } from '../../interfaces/venta.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbmServices } from 'src/app/services/abm.service';

const VIEW = 'ventas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [AbmServices]
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  ventasLength: number = 0;
  take: number = 5;
  page: number = 1;
  column: string = '';
  direction: 'ASC' | 'DESC' = 'DESC';
  search: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private abmServices: AbmServices
  ) { }

  ngOnInit() {
    this.getAllVentas();
  }

  abrirModal(ver: boolean, type: string, item: Venta) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.onlyView = ver;
    modalRef.componentInstance.itemType = type;
    modalRef.componentInstance.save.subscribe((savedItem: Venta) => {
    });
  }

  aPuntoVenta() {
    this.router.navigate(['/in/ventas/punto-venta']);
  }

  getAllVentas() {
    this.abmServices.getAll(VIEW, this.take, this.page, this.column, this.direction, this.search).subscribe({
      next: (response: any) => {
        this.ventasLength = response.pagination.totalResults;
        this.ventas = response.data;
        this.direction === 'ASC' ? this.direction = 'DESC' : this.direction = 'ASC';
      },
      error: err => this.handleError(err)
    });
  }

  deleteVenta(id: number) {
    this.abmServices.delete(VIEW, id).subscribe({
      next: (response: any) => {
        this.getAllVentas();
        this.toastr.success('Se ha eliminado la venta', 'Eliminada');
      },
      error: err => this.handleError(err)
    });
  }

  private handleError(err: any) {
    this.toastr.error(err, 'Error');
  }

  sort(col: string) {
    this.column = col;
    this.getAllVentas();
  }

  pageBack() {
    this.page--;
    this.getAllVentas();
  }

  pageForw() {
    this.page++;
    this.getAllVentas();
  }
}