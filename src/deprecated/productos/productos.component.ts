import { Component, OnInit } from '@angular/core';
import { Producto } from '../../app/interfaces/producto.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../app/components/modal/modal.component';
import { Subject, debounceTime } from 'rxjs';
import { AbmService } from 'src/app/services/abm.service';

const VIEW = 'productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [AbmService]
})
export class ProductosComponent implements OnInit {
  private searchInputSubject = new Subject<string>();

  constructor(
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

  abrirModal(ver: boolean, type: string, item?: Producto) {
    const operation = item ? 'editar' : 'crear';
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    if (item) {
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Producto) => {
        this.abmService.createOrEditItem(VIEW, operation, savedItem);
      });
    } else {
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Producto) => {
        this.abmService.createOrEditItem(VIEW, operation, savedItem);
      });
    }
  }
}