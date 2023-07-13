import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'entrega-insumo-tabs',
  templateUrl: './entrega-insumo.tabs.component.html',
  styleUrls: ['./entrega-insumo.tabs.component.css'],
})
export class SuppliesDeliveriesTabsComponent implements OnInit {

  @Input() route: string = '';
  @Input() archived = true;
  currentMonth = this.getMonth();

  constructor() {}

  ngOnInit(): void {}

  getMonth(): string {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return month;
  }
}
