import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesQueries } from '../services/queries/clientes';
import { ProductosQueries } from '../services/queries/productos';
import { Item } from '../interfaces/item.interface';
import { Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss']
})
export class PuntoVentaComponent {
  clientes: any[] = [];
  clSearch: string = '';
  productos: Producto[] = [];
  prSearch: string = '';
  prList: boolean = false;
  selectedClient: any = null;
  items: Item[] = [];
  total: number = 0;
  clQu: ClientesQueries = new ClientesQueries(this.http);
  prQu: ProductosQueries = new ProductosQueries(this.http);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerProductos();
  }

  obtenerClientes() {
    this.clQu.obtenerClientes(1000, 1, this.clSearch).subscribe({
      next: (response: any) => {
        this.clientes = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de clientes:', error);
      }
    });
  }

  obtenerProductos() {
    this.prQu.obtenerProductos(1000, 1, this.prSearch).subscribe({
      next: (response: any) => {
        this.productos = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de productos:', error);
      }
    });
  }

  actualizarTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.importe_total, 0);
  }

  nuevoItem(nombre: string, precio: number, id: number) {
    const nuevoPrecio: number = parseInt(precio.toString());
    const item: Item = {
      cantidad: 1,
      nombre: nombre,
      importe_unitario: nuevoPrecio,
      producto_id: id,
      importe_total: nuevoPrecio
    }
    this.items = [...this.items, item];
    console.log(this.items);
    this.actualizarTotal();
  }

  noLists() {
    setTimeout(() => {
      this.prList = false
    }, 100);
  }
}