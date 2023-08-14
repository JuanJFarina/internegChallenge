import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public activeModal: NgbActiveModal) { }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  closeModal() {
    this.activeModal.close();
  }

  onSave() {
    console.log(this.item);
    this.save.emit(this.item);
    this.closeModal();
  }
}