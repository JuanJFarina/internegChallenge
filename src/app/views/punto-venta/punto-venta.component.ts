import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesQueries } from '../../services/queries/clientes';
import { ProductosQueries } from '../../services/queries/productos';
import { Item } from '../../interfaces/item.interface';
import { Producto } from '../../interfaces/producto.interface';
import { VentasQueries } from '../../services/queries/ventas';
import { Router } from '@angular/router';
import { Venta } from '../../interfaces/venta.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss']
})
export class PuntoVentaComponent {
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');

  today: string = `${this.year}-${this.month}-${this.day}`;
  clientes: any[] = [];
  clSearch: string = '';
  clList: boolean = false;
  productos: Producto[] = [];
  prSearch: string = '';
  prList: boolean = false;
  selectedClient: any = { nombre: 'Consumidor final', id: 0 };
  items: Item[] = [];
  total: number = 0;
  date: string = this.today;
  observaciones: string = '';
  errDate: boolean = false;
  errSell: boolean = false;
  clQu: ClientesQueries = new ClientesQueries(this.http);
  prQu: ProductosQueries = new ProductosQueries(this.http);
  vnQu: VentasQueries = new VentasQueries(this.http);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
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
    if (!(this.date >= '1990' && this.date <= this.today) || !this.total || !this.items.length) {
      this.date >= '1990' && this.date <= this.today ? this.errDate = false : this.toastr.error('Debe ingresar una fecha válida', 'Oops !');
      this.date >= '1990' && this.date <= this.today ? null : this.errDate = true;
      this.total || this.items.length ? this.errSell = false : this.toastr.error('Debe ingresar productos', 'Oops !');
      this.total || this.items.length ? null : this.errSell = true;
    }
    else {
      this.vnQu.crearVenta(nuevaVenta).subscribe({
        next: (response: any) => {
          this.toastr.success('Se ha creado la venta', 'Creada !');
          this.router.navigate(["/in/ventas"]);
        },
        error: (error) => {
          console.error('Error al crear venta:', error);
        }
      })
    }
  }

  actImp(i: number, operacion: number) {
    if (operacion === 1) {
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