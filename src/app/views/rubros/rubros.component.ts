import { Component, OnInit } from '@angular/core';
import { AbmServices } from '../../services/abm.service';
import { Rubro } from '../../interfaces/rubro.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';

const VIEW = 'rubros';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss'],
  providers: [AbmServices]
})
export class RubrosComponent implements OnInit {
  private searchInputSubject = new Subject<string>();
  rubros: any;
  rubrosLength: number = 0;
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
      this.getAllRubros();
    });
  }

  ngOnInit() {
    this.getAllRubros();
  }

  onInputChanged() {
    this.searchInputSubject.next('');
  }

  abrirModal(ver: boolean, type: string, item?: Rubro) {
    const operation = item ? 'editar' : 'crear';
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    if (item) {
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Rubro) => {
        this.createOrEditRubro(operation, savedItem);
      });
    } else {
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Rubro) => {
        this.createOrEditRubro(operation, savedItem);
      });
    }
  }

  getAllRubros() {
    this.abmServices.getAll(VIEW, this.take, this.page, this.column, this.direction, this.search).subscribe({
      next: (response: any) => {
        this.rubrosLength = response.pagination.totalResults;
        this.rubros = response.data;
        this.direction === 'ASC' ? this.direction = 'DESC' : this.direction = 'ASC';
      },
      error: err => this.handleError(err)
    });
  }

  createOrEditRubro(operation: 'crear' | 'editar', rubro: any) {
    const observable = operation === 'crear'
      ? this.abmServices.create(VIEW, rubro)
      : this.abmServices.edit(VIEW, rubro);

    observable.subscribe({
      next: (response: any) => {
        this.getAllRubros();
        const action = operation === 'crear' ? 'creado' : 'editado';
        this.toastr.success(`Se ha ${action} el rubro`, 'Éxito !');
      },
      error: err => this.handleError(err)
    });
  }

  deleteRubro(id: number) {
    this.abmServices.delete(VIEW, id).subscribe({
      next: (response: any) => {
        this.getAllRubros();
        this.toastr.success('Se ha eliminado el rubro', 'Eliminado !');
      },
      error: err => this.handleError(err)
    })
  }

  sort(col: string) {
    this.column = col;
    this.getAllRubros();
  }

  private handleError(err: any) {
    this.toastr.error(err, 'Error');
  }

  pageBack() {
    this.page--;
    this.getAllRubros();
  }

  pageForw() {
    this.page++;
    this.getAllRubros();
  }
}