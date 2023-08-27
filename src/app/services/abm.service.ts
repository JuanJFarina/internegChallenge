import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../interfaces/config.interface';
import { SERVICE_CONFIG } from './config.service';

@Injectable()
export class AbmService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    @Inject(SERVICE_CONFIG) private config: Config,
    private toastr: ToastrService,
  ) {
    this.headers = this.createHeaders();
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$: Observable<any[]> = this.itemsSubject.asObservable();
  private itemsLengthSubject = new BehaviorSubject<number>(0);
  itemsLength$: Observable<number> = this.itemsLengthSubject.asObservable();
  take: number = 5;
  page: number = 1;
  column: string = '';
  direction: 'ASC' | 'DESC' = 'DESC';
  search: string = '';

  getAllItems(view: string) {
    let apiUrl = this.search
      ? `${this.config.apiEndpoint}/${view}?search=${this.search}`
      : `${this.config.apiEndpoint}/${view}?take=${this.take}&page=${this.page}&order_by_column=${this.column}&order_by_direction=${this.direction}`;
      
    this.http.get(apiUrl, { headers: this.headers }).subscribe({
      next: (data: any) => {
        this.itemsSubject.next(data.data);
        this.itemsLengthSubject.next(data.pagination?.totalResults);
      }
    });
  }

  createOrEditItem(view: string, operation: 'crear' | 'editar', rubro: any) {
    const apiUrl = operation === 'crear'
      ? `${this.config.apiEndpoint}/${view}`
      : `${this.config.apiEndpoint}/${view}/${rubro.id}`;

      this.http.post(apiUrl, rubro, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.getAllItems(view);
        const action = operation === 'crear' ? 'creado' : 'editado';
        console.log('Éxito !');this.toastr.success(`Se ha ${action} el rubro`, 'Éxito !');
      },
      error: err => this.handleError(err)
    });
  }

  deleteItem(view: string, id: number) {
    const apiUrl = `${this.config.apiEndpoint}/${view}/eliminar`;
    const payload = { id: id };
    this.http.post(apiUrl, payload, { headers: this.headers }).subscribe({
      next: (response: any) => {
        this.getAllItems(view);
        console.log('Eliminado !');this.toastr.success('Se ha eliminado el rubro', 'Eliminado !');
      },
      error: err => this.handleError(err)
    })
  }

  sort(view: string, col: string) {
    this.column = col;
    this.direction === 'ASC' ? this.direction = 'DESC' : this.direction = 'ASC';
    this.getAllItems(view);
  }

  private handleError(err: any) {
    this.toastr.error(err, 'Error');
  }

  pageBack(view: string) {
    this.page--;
    this.getAllItems(view);
  }

  pageForw(view: string) {
    this.page++;
    this.getAllItems(view);
  }
}