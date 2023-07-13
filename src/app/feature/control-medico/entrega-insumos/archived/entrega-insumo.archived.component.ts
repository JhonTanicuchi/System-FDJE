import { Component, OnInit } from '@angular/core';
import { SuppliesDelivery } from '../entrega-insumo';
import { SuppliesDeliveriesService } from '../entrega-insumo.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { DatePipe } from '@angular/common';
import { NamesSurnamesCompletePipe } from 'src/app/shared/pipes/names-surnames-complete.pipe';

@Component({
  selector: 'app-entrega-insumo-archived',
  templateUrl: './entrega-insumo.archived.component.html',
  styleUrls: ['./entrega-insumo.archived.component.css'],
  providers: [DatePipe, NamesSurnamesCompletePipe],
})
export class SuppliesDeliveriesArchivedComponent implements OnInit {
  supplies_deliveries_archived: SuppliesDelivery[] = [];

  //loading
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    private suppliesDeliveriesService: SuppliesDeliveriesService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private NamesSurnamesCompletePipe: NamesSurnamesCompletePipe
  ) {}

  ngOnInit(): void {
    this.getSuppliesDeliveriesArchived();
  }

  getSuppliesDeliveriesArchived(): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .getSuppliesDeliveriesArchived()
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.supplies_deliveries_archived = res.data.supplies_deliveries;
        }
        this.loading = false;
      });
  }

  searchSuppliesDeliveriesArchivedByTerm(term: string): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .searchSuppliesDeliveriesArchivedByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.supplies_deliveries_archived = res.data.supplies_deliveries;
        }
        this.loading = false;
      });
  }

  restoreSuppliesDelivery(suppliesDelivery: SuppliesDelivery): void {
    this.suppliesDeliveriesService
      .restoreSuppliesDelivery(suppliesDelivery.id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.getSuppliesDeliveriesArchived();
        }
      });
  }

  openDialogArchiveSuppliesDelivery(suppliesDelivery: SuppliesDelivery): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar este registro de entrega de insumos?',
        message: 'El registro será eliminado y no podrá ser recuperado',
        dato: `${this.NamesSurnamesCompletePipe.transform(
          suppliesDelivery.patient.person
        )}, Entrega:  ${this.datePipe.transform(
          suppliesDelivery.created_at,
          'dd/MM/yyyy'
        )}`,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSuppliesDelivery(suppliesDelivery);
      }
    });
  }

  deleteSuppliesDelivery(suppliesDelivery: SuppliesDelivery): void {
    this.suppliesDeliveriesService
      .deleteSuppliesDelivery(suppliesDelivery.id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.getSuppliesDeliveriesArchived();
        }
      });
  }
}
