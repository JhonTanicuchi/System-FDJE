import { Component, OnInit } from '@angular/core';
import { SuppliesDelivery } from '../entrega-insumo';
import { SuppliesDeliveriesService } from '../entrega-insumo.service';
import { Patient } from 'src/app/feature/pacientes/paciente';

@Component({
  selector: 'app-entrega-insumo-follow',
  templateUrl: './entrega-insumo.follow.component.html',
  styleUrls: ['./entrega-insumo.follow.component.css']
})
export class SuppliesDeliveriesFollowComponent implements OnInit {
  reverse = false;

  loading: boolean = true;
  
  currentMonth = this.getMonth();

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  supplies_deliveries_patients: {
    patient: Patient;
    supplies_delivery: SuppliesDelivery;
  }[] = [];

  constructor(
    private suppliesDeliveriesService: SuppliesDeliveriesService,
  ) {}

  ngOnInit(): void {
    this.getSuppliesDeliveriesWithPatients();
  }

  getSuppliesDeliveriesWithPatients(): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .getSuppliesDeliveriesWithPatients()
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.supplies_deliveries_patients =
            res.data.patients_with_supplies_delivery;
          this.supplies_deliveries_patients.forEach((suppliesDelivery) => {
            if (!suppliesDelivery.supplies_delivery) {
              suppliesDelivery.supplies_delivery = {} as SuppliesDelivery;
            }
          });
        }
        this.loading = false;
      });
  }

  searchSuppliesDeliveriesWithPatientsByTerm(term: string): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .searchSuppliesDeliveriesWithPatientsByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.supplies_deliveries_patients =
            res.data.patients_with_supplies_delivery;
          this.supplies_deliveries_patients.forEach((suppliesDelivery) => {
            if (!suppliesDelivery.supplies_delivery) {
              suppliesDelivery.supplies_delivery = {} as SuppliesDelivery;
            }
          });
        }

        if (term === '') {
          this.getSuppliesDeliveriesWithPatients();
        }

        this.loading = false;
      });
  }

  reversOrder(): void {
    this.supplies_deliveries_patients.reverse();
    this.reverse = !this.reverse;
  }

  getMonth(): string {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return month;
  }
}
