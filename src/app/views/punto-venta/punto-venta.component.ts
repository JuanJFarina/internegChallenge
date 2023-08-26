import { Component } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { Router } from '@angular/router';
import { Venta } from '../../interfaces/venta.interface';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { AbmService } from 'src/app/services/abm.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss'],
  providers: [AbmService]
})
export class PuntoVentaComponent {
  private clientInputSubject = new Subject<string>();
  private productInputSubject = new Subject<string>();
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');
  today: string = `${this.year}-${this.month}-${this.day}`;
  clSearch: string = '';
  clList: boolean = false;
  prSearch: string = '';
  prList: boolean = false;
  selectedClient: any = { nombre: 'Consumidor final', id: 0 };
  items: Item[] = [];
  total: number = 0;
  date: string = this.today;
  observaciones: string = '';
  errDate: boolean = false;
  errSell: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public abmService: AbmService
  ) {
    this.clientInputSubject.pipe(debounceTime(300)).subscribe(() => {
      this.abmService.getAllItems('clientes');
      setTimeout(() => {this.clList = true}, 500);
    });
    this.productInputSubject.pipe(debounceTime(300)).subscribe(() => {
      this.abmService.getAllItems('productos');
      setTimeout(() => {this.prList = true}, 500);
    })
  }

  ngOnInit() {
  }

  onFocus(view: string) {
    this.abmService.search = 'nullundefined';
    view === 'clientes'
    ? (
      this.clientInputSubject.next('')
    )
    : (
      this.productInputSubject.next('')
    )
  }

  onChanged(view: string) {
    view === 'clientes'
    ? (
      this.abmService.search = this.clSearch,
      this.abmService.search === '' ? this.abmService.search = 'nullundefined' : null,
      this.clientInputSubject.next('')
    )
    : (
      this.abmService.search = this.prSearch,
      this.abmService.search === '' ? this.abmService.search = 'nullundefined' : null,
      this.productInputSubject.next('')
    )
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
      this.abmService.createOrEditItem('ventas', 'crear', nuevaVenta);
      this.router.navigate(["/in/ventas"]);
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

  noLists(list: string) {
    setTimeout(() => {
      list === 'pr'
      ? (
        this.prList = false,
        this.prSearch = ''
      )
      : (
        this.clList = false,
        this.clSearch = ''
      )
    }, 100);
  }
}