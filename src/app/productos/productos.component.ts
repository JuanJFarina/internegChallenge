import { Component, OnInit } from '@angular/core';
import { ProductosQueries } from '../services/queries/productos';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any;
  productosLength: number = 0;
  take: number = 5;
  page: number = 1;
  search: string = '';
  sort: number = -1;
  prQu: ProductosQueries = new ProductosQueries(this.http);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  abrirModal(ver: boolean, type: string, item?: Producto) {
    if(item) {
      const modalRef = this.modalService.open(ModalComponent, {size: 'lg'});
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Producto) => {
        this.editarProducto(savedItem);
      });
    }
    else {
      const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Producto) => {
        this.crearProducto(savedItem);
      });
    }
  }

  obtenerProductos() {
    this.prQu.obtenerProductos(this.take, this.page, this.search).subscribe({
      next: (response: any) => {
        console.log(response);
        this.productosLength = response.pagination.totalResults;
        this.productos = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de productos:', error);
      }
    });
  }

  verProducto(productoId: number) {
    this.prQu.verProducto(productoId).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener producto:', error);
      }
    })
  }

  crearProducto(producto: any) {
    this.prQu.crearProducto(producto).subscribe({
      next: (response: any) => {
        this.obtenerProductos();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al crear producto:', error);
      }
    })
  }

  editarProducto(producto: Producto) {
    this.prQu.editarProducto(producto.id, producto).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al editar producto:', error);
      }
    })
  }

  eliminarProducto(id: number) {
    this.prQu.eliminarProducto(id).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa, por ejemplo, actualizar la lista de productos
        this.obtenerProductos();
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al eliminar el producto:', error);
      }
    })
  }

  toggleNom() {
    this.sort = -this.sort;
    this.productos = this.productos.sort((a: Producto, b: Producto) => {
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
    this.productos = this.productos.sort((a: Producto, b: Producto) => {
      if (a.codigo < b.codigo) {
        return this.sort;
      } else if (a.codigo > b.codigo) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  togglePrecio() {
    this.sort = -this.sort;
    this.productos = this.productos.sort((a: Producto, b: Producto) => {
      if (a.precio < b.precio) {
        return this.sort;
      } else if (a.precio > b.precio) {
        return -this.sort;
      } else {
        return 0;
      }
    })
  }

  toggleRubro() {
    this.sort = -this.sort;
    this.productos = this.productos.sort((a: Producto, b: Producto) => {
      const nombreA = a.rubro.nombre.toLowerCase();
      const nombreB = b.rubro.nombre.toLowerCase();

      if (nombreA < nombreB) {
        return this.sort;
      } else if (nombreA > nombreB) {
        return -this.sort;
      } else {
        return 0;
      }
    });
  }

  pageBack() {
    this.page--;
    this.obtenerProductos();
  }

  pageForw() {
    this.page++;
    this.obtenerProductos();
  }
}