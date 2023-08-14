import { Component, OnInit } from '@angular/core';
import { RubrosQueries } from '../services/queries/rubros';
import { HttpClient } from '@angular/common/http';
import { Rubro } from '../interfaces/rubro.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  rubros: any;
  ruQu: RubrosQueries = new RubrosQueries(this.http);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.obtenerRubros();
  }

  abrirModal(ver: boolean, type: string, item?: Rubro) {
    if(item) {
      const modalRef = this.modalService.open(ModalComponent, {size: 'lg'});
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Rubro) => {
        this.editarRubro(savedItem);
      });
    }
    else {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Rubro) => {
        this.crearRubro(savedItem);
      });
    }
  }

  obtenerRubros() {
    this.ruQu.obtenerRubros().subscribe({
      next: (response: any) => {
        console.log(response);
        console.log(response.data);
        this.rubros = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de rubros:', error);
      }
    });
  }

  verRubro(rubroId: number) {
    this.ruQu.verRubro(rubroId).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener rubro:', error);
      }
    })
  }

  crearRubro(rubro: any) {
    this.ruQu.crearRubro(rubro).subscribe({
      next: (response: any) => {
          console.log(response);
          this.obtenerRubros();
      },
      error: (error) => {
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
          console.error('Error al crear rubro:', error);
      }
  })
  }

  editarRubro(rubro: Rubro) {
    this.ruQu.editarRubro(rubro.id, rubro).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al editar rubro:', error);
      }
    })
  }

  eliminarRubro(id: number) {
    this.ruQu.eliminarRubro(id).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa, por ejemplo, actualizar la lista de rubros
        this.obtenerRubros();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al eliminar el producto:', error);
      }
    })
  }
}