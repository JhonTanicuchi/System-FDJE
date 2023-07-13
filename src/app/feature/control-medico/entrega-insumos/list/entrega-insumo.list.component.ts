import { Component, OnInit } from '@angular/core';
import { SuppliesDelivery } from '../entrega-insumo';
import { SuppliesDeliveriesService } from '../entrega-insumo.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { NamesSurnamesCompletePipe } from 'src/app/shared/pipes/names-surnames-complete.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entrega-insumo-list',
  templateUrl: './entrega-insumo.list.component.html',
  styleUrls: ['./entrega-insumo.list.component.css'],
  providers: [DatePipe, NamesSurnamesCompletePipe],
})
export class SuppliesDeliveriesListComponent implements OnInit {
  reverse = false;
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  supplies_deliveries: SuppliesDelivery[] = [];

  constructor(
    private suppliesDeliveriesService: SuppliesDeliveriesService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private NamesSurnamesCompletePipe: NamesSurnamesCompletePipe
  ) {}

  ngOnInit(): void {
    this.getSuppliesDeliveries();
  }

  public getSuppliesDeliveries(): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .getSuppliesDeliveries()
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.supplies_deliveries = res.data.supplies_deliveries;

          this.supplies_deliveries.sort((a, b) => {
            if (a.created_at > b.created_at) {
              return 1;
            }
            if (a.created_at < b.created_at) {
              return -1;
            }
            return 0;
          });
        }
        this.loading = false;
      });
  }

  public searchEntregasInsumosByTerm(term: string): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .searchSuppliesDeliveriesByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.supplies_deliveries = res.data.supplies_deliveries;
        }

        if (term === '') {
          this.getSuppliesDeliveries();
        }

        this.loading = false;
      });
  }

  public archiveSuppliesDelivery(supplies_delivery: SuppliesDelivery): void {
    this.suppliesDeliveriesService
      .archiveSuppliesDelivery(supplies_delivery.id)
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this.getSuppliesDeliveries();
        }
      });
  }

  public openDialogArchiveSuppliesDelivery(
    supplies_delivery: SuppliesDelivery
  ): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar este registro de entrega de insumos?',
        message: 'El registro será eliminado y no podrá ser recuperado',
        dato: `${this.NamesSurnamesCompletePipe.transform(
          supplies_delivery.patient.person
        )}, Entrega:  ${this.datePipe.transform(
          supplies_delivery.created_at,
          'dd/MM/yyyy'
        )}`,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.archiveSuppliesDelivery(supplies_delivery);
      }
    });
  }

  public reversOrder(): void {
    this.supplies_deliveries.reverse();
    this.reverse = !this.reverse;
  }
}
