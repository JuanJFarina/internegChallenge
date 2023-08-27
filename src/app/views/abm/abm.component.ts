import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { Subject, debounceTime } from 'rxjs';
import { AbmService } from 'src/app/services/abm.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.scss'],
  providers: [AbmService]
})
export class AbmComponent implements OnInit {
  private searchInputSubject = new Subject<string>();
  view!: string;
  item!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public abmService: AbmService
  ) {
    this.searchInputSubject.pipe(debounceTime(300)).subscribe(() => {
      this.abmService.getAllItems(this.view);
    });
  }

  ngOnInit() {
    this.view = this.router.url.split('/')[2];
    this.item = this.view.slice(0, this.view.length-1);
    this.abmService.getAllItems(this.view);
  }

  onInputChanged() {
    this.searchInputSubject.next('');
  }

  abrirModal(ver: boolean, type: string, item?: any) {
    const operation = item ? 'editar' : 'crear';
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    if (item) {
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: any) => {
        this.abmService.createOrEditItem(this.view, operation, savedItem);
      });
    } else {
      modalRef.componentInstance.onlyView = ver;
      modalRef.componentInstance.itemType = type;
      modalRef.componentInstance.save.subscribe((savedItem: any) => {
        this.abmService.createOrEditItem(this.view, operation, savedItem);
      });
    }
  }

  aPuntoVenta() {
    this.router.navigate(['/in/ventas/punto-venta']);
  }
}