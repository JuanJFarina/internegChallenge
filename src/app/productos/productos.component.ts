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
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: Producto) => {
        this.crearProducto(savedItem);
      });
    }
  }

  obtenerProductos() {
    this.prQu.obtenerProductos().subscribe({
      next: (response: any) => {
        console.log(response);
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
        console.log(response);
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
}