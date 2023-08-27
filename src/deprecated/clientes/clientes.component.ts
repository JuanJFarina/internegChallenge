import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../app/interfaces/cliente.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../app/components/modal/modal.component';
import { Subject, debounceTime } from 'rxjs';
import { AbmService } from 'src/app/services/abm.service';

const VIEW = 'clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [AbmService]
})
export class ClientesComponent implements OnInit {
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

  abrirModal(ver: boolean, type: string, item?: Cliente) {
    const operation = item ? 'editar' : 'crear';
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    if (item) {
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Cliente) => {
        this.abmService.createOrEditItem(VIEW, operation, savedItem);
      });
    } else {
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Cliente) => {
        this.abmService.createOrEditItem(VIEW, operation, savedItem);
      });
    }
  }
}