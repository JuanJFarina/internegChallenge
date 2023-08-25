import { Component, OnInit } from '@angular/core';
import { ClientesQueries } from '../../services/queries/clientes';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../interfaces/cliente.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes!: any[];
  clientesLength: number = 0;
  take: number = 5;
  page: number = 1;
  search: string = '';
  sort: number = -1;
  clQu: ClientesQueries = new ClientesQueries(this.http);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.obtenerClientes();
  }

  abrirModal(ver: boolean, type: string, item?: Cliente) {
    if (item) {
      const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Cliente) => {
        this.editarCliente(savedItem);
        this.toastr.success('Se ha editado el cliente','Éxito !');
      });
    }
    else {
      const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Cliente) => {
        this.crearCliente(savedItem);
        this.toastr.success('Se ha creado el cliente','Creado !');
      });
    }
  }

  obtenerClientes() {
    this.clQu.obtenerClientes(this.take, this.page, this.search).subscribe({
      next: (response: any) => {
        this.clientesLength = response.pagination.totalResults;
        this.clientes = response.data;
      },
      error: (error) => {
        console.error('Error al obtener la lista de clientes:', error);
      }
    });
  }

  crearCliente(cliente: any) {
    this.clQu.crearCliente(cliente).subscribe({
      next: (response: any) => {
        this.obtenerClientes();
      },
      error: (error) => {
        console.error('Error al crear cliente:', error);
      }
    })
  }

  editarCliente(cliente: Cliente) {
    this.clQu.editarCliente(cliente).subscribe({
      next: (response: any) => {
        this.obtenerClientes();
      },
      error: (error) => {
        console.error('Error al editar cliente:', error);
      }
    })
  }

  eliminarCliente(id: number) {
    this.clQu.eliminarCliente(id).subscribe({
      next: (response: any) => {
        this.obtenerClientes();
        this.toastr.success('Se ha eliminado el cliente','Eliminado !');
      },
      error: (error) => {
        console.error('Error al eliminar el cliente:', error);
      }
    })
  }

  toggleNom() {
    this.sort = -this.sort;
    this.clientes = this.clientes.sort((a: Cliente, b: Cliente) => {
      const nombreA = a.nombre.toLowerCase();
      const nombreB = b.nombre.toLowerCase();

      if (nombreA < nombreB) {
        return this.sort;
      } else if (nombreA > nombreB) {
        return -this.sort;
      } else {
        return 0;
      }
    });
  }

  toggleCuit() {
    this.sort = -this.sort;
    this.clientes = this.clientes.sort((a: Cliente, b: Cliente) => {
      if (a.cuit < b.cuit) {
        return this.sort;
      } else if (a.cuit > b.cuit) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  toggleEmail() {
    this.sort = -this.sort;
    this.clientes = this.clientes.sort((a: Cliente, b: Cliente) => {
      const emailA = a.email!.toLowerCase();
      const emailB = b.email!.toLowerCase();
      if (emailA < emailB) {
        return this.sort;
      } else if (emailA > emailB) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  toggleDom() {
    this.sort = -this.sort;
    this.clientes = this.clientes.sort((a: Cliente, b: Cliente) => {
      const domA = a.domicilio!.toLowerCase();
      const domB = b.domicilio!.toLowerCase();
      if (domA < domB) {
        return this.sort;
      } else if (domA > domB) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  toggleTel() {
    this.sort = -this.sort;
    this.clientes = this.clientes.sort((a: Cliente, b: Cliente) => {
      if (a.telefono! < b.telefono!) {
        return this.sort;
      } else if (a.telefono! > b.telefono!) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  pageBack() {
    this.page--;
    this.obtenerClientes();
  }

  pageForw() {
    this.page++;
    this.obtenerClientes();
  }
}