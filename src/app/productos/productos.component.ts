import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    const apiUrl = 'URL_DE_LA_API/productos';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.productos = response.data;
      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }

  verProducto(productoId: number) {
    // Implementar la lógica para mostrar los detalles del producto (acción "Ver")
  }

  editarProducto(productoId: number) {
    // Implementar la lógica para editar un producto (acción "Editar")
  }

  eliminarProducto(productoId: number) {
    const apiUrl = 'URL_DE_LA_API/productos/eliminar';
    const payload = { id: productoId };

    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        this.obtenerProductos();
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}