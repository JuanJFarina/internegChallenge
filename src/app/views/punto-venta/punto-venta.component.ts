import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesQueries } from '../../services/queries/clientes';
import { ProductosQueries } from '../../services/queries/productos';
import { Item } from '../../interfaces/item.interface';
import { Producto } from '../../interfaces/producto.interface';
import { VentasQueries } from '../../services/queries/ventas';
import { Router } from '@angular/router';
import { Venta } from '../../interfaces/venta.interface';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss']
})
export class PuntoVentaComponent {
  today: string = new Date().toISOString().split("T")[0];
  clientes: any[] = [];
  clSearch: string = '';
  clList: boolean = false;
  productos: Producto[] = [];
  prSearch: string = '';
  prList: boolean = false;
  selectedClient: any = {nombre: 'Consumidor final', id: 0};
  items: Item[] = [];
  total: number = 0;
  date: string = this.today;
  observaciones: string = '';
  errDate: boolean = false;
  errClient: boolean = false;
  errSell: boolean = false;
  clQu: ClientesQueries = new ClientesQueries(this.http);
  prQu: ProductosQueries = new ProductosQueries(this.http);
  vnQu: VentasQueries = new VentasQueries(this.http);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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
        console.error('Error al obtener la lista de productos:', error);
      }
    });
  }

  crearVenta() {
   const nuevaVenta: Venta = {
      fecha: this.date,
      cliente_id: this.selectedClient?.id,
      importe_total: this.total,
      observaciones: this.observaciones,
      items: this.items
    };
    if(!this.date || !this.selectedClient.nombre || !this.total || !this.items.length) {
      this.date ? this.errDate = false : this.errDate = true;
      this.selectedClient?.nombre ? this.errClient = false : this.errClient = true;
      this.total || this.items.length ? this.errSell = false : this.errSell = true;
    }
    else {
      this.vnQu.crearVenta(nuevaVenta).subscribe({
        next: (response: any) => {
          this.router.navigate(["/ventas"]);
        },
        error: (error) => {
          console.error('Error al crear venta:', error);
        }
      })
    }
  }

  actImp(i: number, operacion: number) {
    if(operacion === 1) {
      this.items[i].cantidad++;
      this.items[i].importe_total = this.items[i].cantidad * this.items[i].importe_unitario;
    }
    else if (operacion === -1) {
      this.items[i].cantidad--;
      this.items[i].cantidad < 1 ? this.items.splice(i, 1) :
      this.items[i].importe_total = this.items[i].cantidad * this.items[i].importe_unitario;
    }
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.importe_total, 0);
  }

  itemExists(nombre: string): number {
    return this.items.findIndex(item => item.nombre === nombre);
  }

  nuevoItem(nombre: string, precio: number, id: number) {
    if (this.itemExists(nombre) === -1) {
      const nuevoPrecio: number = parseInt(precio.toString());
      const item: Item = {
        cantidad: 1,
        nombre: nombre,
        importe_unitario: nuevoPrecio,
        producto_id: id,
        importe_total: nuevoPrecio
      }
      this.items = [...this.items, item];
    }
    else {
      this.actImp(this.itemExists(nombre), +1);
    }
    this.errSell = false;
    this.actualizarTotal();
  }

  noLists() {
    setTimeout(() => {
      this.prList = false;
      this.clList = false;
    }, 100);
  }
}