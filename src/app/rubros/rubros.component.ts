import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  rubros: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerRubros();
  }

  obtenerRubros() {
    const apiUrl = 'URL_DE_LA_API/rubros';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.rubros = response.data;
      },
      (error) => {
        console.error('Error al obtener la lista de rubros:', error);
      }
    );
  }

  verRubro(rubroId: number) {
    // Implementar la lógica para mostrar los detalles del rubro (acción "Ver")
  }

  editarRubro(rubroId: number) {
    // Implementar la lógica para editar un rubro (acción "Editar")
  }

  eliminarRubro(rubroId: number) {
    const apiUrl = 'URL_DE_LA_API/rubros/eliminar';
    const payload = { id: rubroId };

    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        this.obtenerRubros();
      },
      (error) => {
        console.error('Error al eliminar el rubro:', error);
      }
    );
  }
}