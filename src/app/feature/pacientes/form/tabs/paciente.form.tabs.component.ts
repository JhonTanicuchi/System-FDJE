import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'paciente-form-tabs',
  templateUrl: './paciente.form.tabs.component.html',
  styleUrls: ['./paciente.form.tabs.component.css'],
})
export class PacientesFormTabsComponent implements OnInit {
  @Output() tabEmitter = new EventEmitter<number>();

  @Input() route: string;
  @Input() id: number;
  @Input() tab: number;

  constructor() {}

  ngOnInit(): void {}

  tabChange(tab: number) {
    this.tabEmitter.emit(tab);
  }
}
