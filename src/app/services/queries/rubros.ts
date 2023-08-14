import { Rubro } from 'src/app/interfaces/rubro.interface';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class RubrosQueries {

    constructor(private http: HttpClient) { }

    obtenerRubros(): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener la lista de rubros
        const apiUrl = `${Config.domain}/rubros`;
        return this.http.get(apiUrl, { headers });
    }

    verRubro(rubroId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud GET para obtener un rubro
        const apiUrl = `${Config.domain}/rubros/${rubroId}`;
        return this.http.get(apiUrl, { headers });
    }

    crearRubro(rubro: any): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para crear un rubro
        const apiUrl = `${Config.domain}/rubros`;
        return this.http.post(apiUrl, rubro, { headers });
    }

    editarRubro(rubroId: number, rubro: Rubro): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para editar un rubro
        const apiUrl = `${Config.domain}/rubros/${rubroId}`;
        return this.http.post(apiUrl, rubro, { headers });
    }

    eliminarRubro(rubroId: number): Observable<any> {
        // Configura los encabezados con el token de acceso
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        // Realizar una solicitud POST para eliminar el rubro
        const apiUrl = `${Config.domain}/rubros/eliminar`;
        const payload = { id: rubroId };
        return this.http.post(apiUrl, payload, { headers });
    }
}