import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Obtener la lista de clientes al cargar el componente
    this.obtenerClientes();
  }

  obtenerClientes() {
    // Realizar una solicitud GET para obtener la lista de clientes
    const apiUrl = 'URL_DE_LA_API/clientes'; // Reemplaza con la URL correcta de la API
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.clientes = response.data;
      },
      (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de clientes:', error);
      }
    );
  }

  verCliente(clienteId: number) {
    // Implementar la lógica para mostrar los detalles del cliente (acción "Ver")
    // Puedes abrir un modal o redirigir a una vista de detalle específica
  }

  editarCliente(clienteId: number) {
    // Implementar la lógica para editar un cliente (acción "Editar")
    // Puedes abrir un modal o redirigir a una vista de edición específica
  }

  eliminarCliente(clienteId: number) {
    // Implementar la lógica para eliminar un cliente (acción "Eliminar")
    // Realizar una solicitud POST para eliminar el cliente
    const apiUrl = 'URL_DE_LA_API/clientes/eliminar'; // Reemplaza con la URL correcta de la API
    const payload = { id: clienteId };

    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa, por ejemplo, actualizar la lista de clientes
        this.obtenerClientes();
      },
      (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al eliminar el cliente:', error);
      }
    );
  }
}