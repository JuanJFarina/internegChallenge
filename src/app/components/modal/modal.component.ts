import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rubro } from '../../interfaces/rubro.interface';
import { RubrosQueries } from '../../services/queries/rubros';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() item: any = {};
  @Input() onlyView!: boolean;
  @Input() itemType!: string;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  rubros!: Rubro[];
  ruQu: RubrosQueries = new RubrosQueries(this.http);

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.itemType === 'Producto' ? this.obtenerRubros() : null;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  closeModal() {
    this.activeModal.close();
  }

  onSave() {
    switch(this.itemType) {
      case 'Cliente':
        if(this.item.nombre && this.item.cuit) {
          this.save.emit(this.item);
          this.closeModal();
        }
        break;
      case 'Producto':
        if(this.item.nombre && this.item.codigo && this.item.precio) {
          this.save.emit(this.item);
          this.closeModal();
        }
        break;
      case 'Rubro':
        if(this.item.nombre && this.item.codigo) {
          this.save.emit(this.item);
          this.closeModal();
        }
        break;
    }
    this.closeModal();
  }

  obtenerRubros() {
    this.ruQu.obtenerRubros(1000, 1).subscribe({
      next: (response: any) => {
        this.rubros = response.data;
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al obtener la lista de rubros:', error);
      }
    });
  }
}