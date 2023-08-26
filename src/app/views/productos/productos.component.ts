import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { AbmServices } from 'src/app/services/abm.service';

const VIEW = 'productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [AbmServices]
})
export class ProductosComponent implements OnInit {
  private searchInputSubject = new Subject<string>();
  productos!: any[];
  productosLength: number = 0;
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
      this.getAllProductos();
    });
  }

  ngOnInit() {
    this.getAllProductos();
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
        this.createOrEditProducto(operation, savedItem);
      });
    } else {
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Producto) => {
        this.createOrEditProducto(operation, savedItem);
      });
    }
  }

  getAllProductos() {
    this.abmServices.getAll(VIEW, this.take, this.page, this.column, this.direction, this.search).subscribe({
      next: (response: any) => {
        this.productosLength = response.pagination.totalResults;
        this.productos = response.data;
        console.log(response.data);
        this.direction === 'ASC' ? this.direction = 'DESC' : this.direction = 'ASC';
      },
      error: err => this.handleError(err)
    });
  }

  createOrEditProducto(operation: 'crear' | 'editar', producto: Producto) {
    const observable = operation === 'crear'
      ? this.abmServices.create(VIEW, producto)
      : this.abmServices.edit(VIEW, producto);

    observable.subscribe({
      next: (response: any) => {
        this.getAllProductos();
        const action = operation === 'crear' ? 'creado' : 'editado';
        this.toastr.success(`Se ha ${action} el producto`, 'Éxito !');
      },
      error: err => this.handleError(err)
    });
  }

  deleteProducto(id: number) {
    this.abmServices.delete(VIEW, id).subscribe({
      next: (response: any) => {
        this.getAllProductos();
        this.toastr.success('Se ha eliminado el producto', 'Eliminado !');
      },
      error: err => this.handleError(err)
    });
  }

  private handleError(err: any) {
    this.toastr.error(err, 'Error');
  }

  sort(col: string) {
    this.column = col;
    this.getAllProductos();
  }

  pageBack() {
    this.page--;
    this.getAllProductos();
  }

  pageForw() {
    this.page++;
    this.getAllProductos();
  }
}