import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { SERVICE_CONFIG } from './config.service';
import { Config } from 'src/app/interfaces/config.interface';

@Injectable()
export class AbmServices {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    @Inject(SERVICE_CONFIG) private config: Config
  ) {
    this.headers = this.createHeaders();
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  getAll(target: string, take: number, page: number, column: string, direction: 'ASC' | 'DESC', search?: string): Observable<any> {
    let apiUrl = search
      ? `${this.config.apiEndpoint}/${target}?search=${search}`
      : `${this.config.apiEndpoint}/${target}?take=${take}&page=${page}&order_by_column=${column}&order_by_direction=${direction}`;
    return this.http.get(apiUrl, { headers: this.headers });
  }

  getOne(target: string, id: number): Observable<any> {
    const apiUrl = `${this.config.apiEndpoint}/${target}/${id}`;
    return this.http.get(apiUrl, { headers: this.headers });
  }

  create(target: string, item: any): Observable<any> {
    const apiUrl = `${this.config.apiEndpoint}/${target}`;
    return this.http.post(apiUrl, item, { headers: this.headers });
  }

  edit(target: string, item: any): Observable<any> {
    const apiUrl = `${this.config.apiEndpoint}/${target}/${item.id}`;
    return this.http.post(apiUrl, item, { headers: this.headers });
  }

  delete(target: string, id: number): Observable<any> {
    const apiUrl = `${this.config.apiEndpoint}/${target}/eliminar`;
    const payload = { id: id };
    return this.http.post(apiUrl, payload, { headers: this.headers });
  }

/*  sort(target: string, take: number, page: number, column: string, direction: 'ASC' | 'DESC'): Observable<any> {
    const apiUrl = `${this.config.apiEndpoint}/${target}?take=${take}&page=${page}&order_by_column=${column}&order_by_direction=${direction}`;
    return this.http.get(apiUrl, { headers: this.headers });
  }*/
}