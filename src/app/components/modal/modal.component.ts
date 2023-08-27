import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbmService } from 'src/app/services/abm.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [AbmService]
})
export class ModalComponent {
  @Input() item: any = {};
  @Input() onlyView!: boolean;
  @Input() itemType!: string;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public abmService: AbmService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.abmService.take = 1000;
    this.itemType === 'Producto' ? this.abmService.getAllItems('rubros') : null;
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
}