import { Venta } from 'src/app/interfaces/venta.interface';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class VentasQueries {

    constructor(private http: HttpClient) { }

    obtenerVentas(take: number, page: number, search?: string): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener la lista de ventas
        let apiUrl = '';
        search ? apiUrl = `${Config.domain}/ventas?search=${search}` : 
        apiUrl = `${Config.domain}/ventas?take=${take}&page=${page}`;
        return this.http.get(apiUrl, { headers });
    }

    verVenta(ventaId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener un venta
        const apiUrl = `${Config.domain}/ventas/${ventaId}`;
        return this.http.get(apiUrl, { headers });
    }

    crearVenta(venta: any): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para crear una venta
        const apiUrl = `${Config.domain}/ventas`;
        return this.http.post(apiUrl, venta, { headers });
    }

    editarVenta(venta: Venta): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para editar una venta
        const apiUrl = `${Config.domain}/clientes/${venta.id}`;
        return this.http.post(apiUrl, venta, { headers });
    }

    eliminarVenta(ventaId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para eliminar la venta
        const apiUrl = `${Config.domain}/ventas/eliminar`;
        const payload = { id: ventaId };

        return this.http.post(apiUrl, payload, { headers });
    }
}