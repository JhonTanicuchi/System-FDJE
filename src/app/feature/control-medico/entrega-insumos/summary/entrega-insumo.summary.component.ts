import { Component, OnInit } from '@angular/core';
import { SuppliesDeliveriesService } from '../entrega-insumo.service';
import { Statistics } from '../entrega-insumo';

@Component({
  selector: 'app-entrega-insumo-summary',
  templateUrl: './entrega-insumo.summary.component.html',
  styleUrls: ['./entrega-insumo.summary.component.css'],
})
export class SuppliesDeliveriesSummaryComponent implements OnInit {
  [x: string]: any;
  constructor(private suppliesDeliveriesService: SuppliesDeliveriesService) {}

  //fecha actual
  fechaActual = new Date();

  loading: boolean = true;

  currentMonthYear: any = this.getCurrentDate();
  currentStatistics: Statistics = {} as Statistics;

  ngOnInit(): void {
    this.getStatisticsSuppliesDeliveredByMonth();
  }

  calcRemaining(length: number, cols: number): number[] {
    const calculatedValue = -(length - cols);
    return Array.from({ length: calculatedValue }, (_, index) => index + 1);
  }

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  getStatisticsSuppliesDeliveredByMonth(): void {
    this.loading = true;
    this.suppliesDeliveriesService
      .getStatisticsSuppliesDeliveredByMonth(this.currentMonthYear)
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this.currentStatistics = res.data;
          console.log(this.currentStatistics);
        }
        this.loading = false;
      });
  }
}
