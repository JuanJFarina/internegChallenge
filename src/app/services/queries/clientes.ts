import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ClientesQueries {

    constructor(private http: HttpClient) { }

    obtenerClientes(): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener la lista de clientes
        const apiUrl = `${Config.domain}/clientes`;
        return this.http.get(apiUrl, { headers });
    }

    verCliente(clienteId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener un cliente
        const apiUrl = `${Config.domain}/cilentes/${clienteId}`;
        return this.http.get(apiUrl, { headers });
    }

    crearCliente(cliente: any): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para crear un cliente
        const apiUrl = `${Config.domain}/clientes`;
        return this.http.post(apiUrl, cliente, { headers });
    }

    editarCliente(cliente: Cliente): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para editar un cliente
        const apiUrl = `${Config.domain}/clientes/${cliente.id}`;
        return this.http.post(apiUrl, cliente, { headers });
    }

    eliminarCliente(clienteId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para eliminar el cliente
        const apiUrl = `${Config.domain}/clientes/eliminar`;
        const payload = { id: clienteId };

        return this.http.post(apiUrl, payload, { headers });
    }
}