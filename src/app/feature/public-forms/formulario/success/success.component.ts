import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(public titleTab: Title) {}

  ngOnInit(): void {
    this.titleTab.setTitle('Formulario de registro de paciente');
  }
}
