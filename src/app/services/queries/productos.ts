import { Producto } from 'src/app/interfaces/producto.interface';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ProductosQueries {

    constructor(private http: HttpClient) { }

    obtenerProductos(): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener la lista de productos
        const apiUrl = `${Config.domain}/productos`;
        return this.http.get(apiUrl, { headers });
    }

    verProducto(productoId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener un producto
        const apiUrl = `${Config.domain}/productos/${productoId}`;
        return this.http.get(apiUrl, { headers });
    }

    crearProducto(producto: any): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para crear un producto
        const apiUrl = `${Config.domain}/productos`;
        return this.http.post(apiUrl, producto, { headers });
    }

    editarProducto(productoId: number, producto: Producto): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para editar un producto
        const apiUrl = `${Config.domain}/productos/${productoId}`;
        return this.http.post(apiUrl, producto, { headers });
    }

    eliminarProducto(productoId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para eliminar el producto
        const apiUrl = `${Config.domain}/productos/eliminar`;
        const payload = { id: productoId };
        return this.http.post(apiUrl, payload, { headers });
    }
}