import { Component, OnInit } from '@angular/core';
import { ClientesQueries } from '../services/queries/clientes';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes!: any[];
  sort: number = -1;
  clQu: ClientesQueries = new ClientesQueries(this.http);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
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
      });
    }
    else {
      const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Cliente) => {
        this.crearCliente(savedItem);
      });
    }
  }

  obtenerClientes() {
    this.clQu.obtenerClientes().subscribe({
      next: (response: any) => {
        console.log(response);
        this.clientes = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de clientes:', error);
      }
    });
  }

  crearCliente(cliente: any) {
    this.clQu.crearCliente(cliente).subscribe({
      next: (response: any) => {
        console.log(response);
        this.obtenerClientes();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al crear cliente:', error);
      }
    })
  }

  editarCliente(cliente: Cliente) {
    this.clQu.editarCliente(cliente).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al editar cliente:', error);
      }
    })
  }

  eliminarCliente(id: number) {
    this.clQu.eliminarCliente(id).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa, por ejemplo, actualizar la lista de clientes
        this.obtenerClientes();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
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
}