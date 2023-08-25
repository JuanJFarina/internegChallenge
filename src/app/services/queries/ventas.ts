import { Venta } from 'src/app/interfaces/venta.interface';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class VentasQueries {

    constructor(private http: HttpClient) { }

    obtenerVentas(take: number, page: number, search?: string): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        let apiUrl = '';
        search ? apiUrl = `${Config.domain}/ventas?search=${search}` : 
        apiUrl = `${Config.domain}/ventas?take=${take}&page=${page}`;
        return this.http.get(apiUrl, { headers });
    }

    verVenta(ventaId: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        const apiUrl = `${Config.domain}/ventas/${ventaId}`;
        return this.http.get(apiUrl, { headers });
    }

    crearVenta(venta: any): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        const apiUrl = `${Config.domain}/ventas`;
        return this.http.post(apiUrl, venta, { headers });
    }

    editarVenta(venta: Venta): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        const apiUrl = `${Config.domain}/clientes/${venta.id}`;
        return this.http.post(apiUrl, venta, { headers });
    }

    eliminarVenta(ventaId: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        const apiUrl = `${Config.domain}/ventas/eliminar`;
        const payload = { id: ventaId };

        return this.http.post(apiUrl, payload, { headers });
    }
}