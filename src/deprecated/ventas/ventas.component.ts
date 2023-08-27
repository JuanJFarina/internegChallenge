import { Component, OnInit } from '@angular/core';
import { Venta } from '../../app/interfaces/venta.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../app/components/modal/modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbmService } from 'src/app/services/abm.service';
import { Subject, debounceTime } from 'rxjs';

const VIEW = 'ventas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [AbmService]
})
export class VentasComponent implements OnInit {
  private searchInputSubject = new Subject<string>();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public abmService: AbmService
  ) {
    this.searchInputSubject.pipe(debounceTime(300)).subscribe(() => {
      this.abmService.getAllItems(VIEW);
    });
  }

  ngOnInit() {
    this.abmService.getAllItems(VIEW);
  }

  onInputChanged() {
    this.searchInputSubject.next('');
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
}