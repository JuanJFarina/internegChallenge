import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss']
})
export class PuntoVentaComponent {
  clientes: any[] = [];
  productos: any[] = [];
  selectedClient: any = null;
  selectedProduct: any = null;
  items: any[] = [];
  totalAmount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Obtener la lista de clientes y productos al cargar el componente
    this.obtenerClientes();
    this.obtenerProductos();
  }

  obtenerClientes() {
    const apiUrl = 'URL_DE_LA_API/clientes';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.clientes = response.data;
      },
      (error) => {
        console.error('Error al obtener la lista de clientes:', error);
      }
    );
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

  agregarItem() {
    // Implementar la lógica para agregar un item a la venta
    if (this.selectedProduct && this.selectedProduct.cantidad > 0) {
      const newItem = {
        producto: this.selectedProduct,
        cantidad: this.selectedProduct.cantidad,
        importeTotal: this.selectedProduct.cantidad * this.selectedProduct.precio
      };
      this.items.push(newItem);
      this.calcularTotal();
    }
  }

  eliminarItem(index: number) {
    // Implementar la lógica para eliminar un item de la venta
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.calcularTotal();
    }
  }

  cambiarCantidad(index: number, newCantidad: number) {
    // Implementar la lógica para cambiar la cantidad de un item de la venta
    if (index >= 0 && index < this.items.length && newCantidad > 0) {
      this.items[index].cantidad = newCantidad;
      this.items[index].importeTotal = newCantidad * this.items[index].producto.precio;
      this.calcularTotal();
    }
  }

  calcularTotal() {
    // Implementar la lógica para calcular el importe total de la venta
    this.totalAmount = this.items.reduce((total, item) => total + item.importeTotal, 0);
  }

  crearVenta() {
    // Implementar la lógica para crear la venta (solicitud POST)
    const apiUrl = 'URL_DE_LA_API/ventas'; // Reemplazar con la URL correcta de la API
    const ventaData = {
      fecha: new Date().toISOString(), // Puedes ajustar esto según la implementación
      cliente_id: this.selectedClient ? this.selectedClient.id : null,
      importe_total: this.totalAmount,
      items: this.items.map(item => ({
        producto_id: item.producto.id,
        cantidad: item.cantidad,
        importe_total: item.importeTotal
      })),
      observaciones: ''
    };

    this.http.post(apiUrl, ventaData).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje de éxito
        console.log('Venta creada:', response);
      },
      (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al crear la venta:', error);
      }
    );
  }
}