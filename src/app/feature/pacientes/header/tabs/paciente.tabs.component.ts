import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paciente-tabs',
  templateUrl: './paciente.tabs.component.html',
  styleUrls: ['./paciente.tabs.component.css'],
})
export class PacientesTabsComponent implements OnInit {
  @Input() newsPatients: number;

  constructor() {}

  ngOnInit(): void {}
}
