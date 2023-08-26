import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { AbmServices } from 'src/app/services/abm.service';

const VIEW = 'clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [AbmServices]
})
export class ClientesComponent implements OnInit {
  private searchInputSubject = new Subject<string>();
  clientes!: any[];
  clientesLength: number = 0;
  take: number = 5;
  page: number = 1;
  column: string = '';
  direction: 'ASC' | 'DESC' = 'ASC';
  search: string = '';

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private abmServices: AbmServices
  ) {
    this.searchInputSubject.pipe(debounceTime(300)).subscribe(() => {
      this.getAllClientes();
    });
  }

  ngOnInit() {
    this.getAllClientes();
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
        this.createOrEditCliente(operation, savedItem);
      });
    } else {
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Cliente) => {
        this.createOrEditCliente(operation, savedItem);
      });
    }
  }

  getAllClientes() {
    this.abmServices.getAll(VIEW, this.take, this.page, this.column, this.direction, this.search).subscribe({
      next: (response: any) => {
        this.clientesLength = response.pagination.totalResults;
        this.clientes = response.data;
        this.direction === 'ASC' ? this.direction = 'DESC' : this.direction = 'ASC';
      },
      error: err => this.handleError(err)
    });
  }

  createOrEditCliente(operation: 'crear' | 'editar', cliente: Cliente) {
    const observable = operation === 'crear'
      ? this.abmServices.create(VIEW, cliente)
      : this.abmServices.edit(VIEW, cliente);

    observable.subscribe({
      next: (response: any) => {
        this.getAllClientes();
        const action = operation === 'crear' ? 'creado' : 'editado';
        this.toastr.success(`Se ha ${action} el cliente`, 'Éxito !');
      },
      error: err => this.handleError(err)
    });
  }

  deleteCliente(id: number) {
    this.abmServices.delete(VIEW, id).subscribe({
      next: (response: any) => {
        this.getAllClientes();
        this.toastr.success('Se ha eliminado el cliente', 'Eliminado !');
      },
      error: err => this.handleError(err)
    });
  }

  private handleError(err: any) {
    this.toastr.error(err, 'Error');
  }

  sort(col: string) {
    this.column = col;
    this.getAllClientes();
  }

  pageBack() {
    this.page--;
    this.getAllClientes();
  }

  pageForw() {
    this.page++;
    this.getAllClientes();
  }
}