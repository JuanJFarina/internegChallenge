import { Component, OnInit } from '@angular/core';
import { RubrosQueries } from '../../services/queries/rubros';
import { HttpClient } from '@angular/common/http';
import { Rubro } from '../../interfaces/rubro.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  rubros: any;
  rubrosLength: number = 0;
  take: number = 5;
  page: number = 1;
  search: string = '';
  sort: number = -1;
  ruQu: RubrosQueries = new RubrosQueries(this.http);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.obtenerRubros();
  }

  abrirModal(ver: boolean, type: string, item?: Rubro) {
    if (item) {
      const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Rubro) => {
        this.editarRubro(savedItem);
        this.toastr.success('Se ha editado el rubro', 'Éxito !');
      });
    }
    else {
      const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Rubro) => {
        this.crearRubro(savedItem);
        this.toastr.success('Se ha creado el rubro', 'Creado !');
      });
    }
  }

  obtenerRubros() {
    this.ruQu.obtenerRubros(this.take, this.page, this.search).subscribe({
      next: (response: any) => {
        this.rubrosLength = response.pagination.totalResults;
        this.rubros = response.data;
      },
      error: (error) => {
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
        console.error('Error al obtener rubro:', error);
      }
    })
  }

  crearRubro(rubro: any) {
    this.ruQu.crearRubro(rubro).subscribe({
      next: (response: any) => {
        this.obtenerRubros();
      },
      error: (error) => {
        console.error('Error al crear rubro:', error);
      }
    })
  }

  editarRubro(rubro: Rubro) {
    this.ruQu.editarRubro(rubro.id, rubro).subscribe({
      next: (response: any) => {
        this.obtenerRubros();
      },
      error: (error) => {
        console.error('Error al editar rubro:', error);
      }
    })
  }

  eliminarRubro(id: number) {
    this.ruQu.eliminarRubro(id).subscribe({
      next: (response: any) => {
        this.obtenerRubros();
        this.toastr.success('Se ha eliminado el rubro', 'Eliminado !');
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    })
  }

  toggleNom() {
    this.sort = -this.sort;
    this.rubros = this.rubros.sort((a: Rubro, b: Rubro) => {
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

  toggleCod() {
    this.sort = -this.sort;
    this.rubros = this.rubros.sort((a: Rubro, b: Rubro) => {
      if (a.codigo < b.codigo) {
        return this.sort;
      } else if (a.codigo > b.codigo) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  pageBack() {
    this.page--;
    this.obtenerRubros();
  }

  pageForw() {
    this.page++;
    this.obtenerRubros();
  }
}