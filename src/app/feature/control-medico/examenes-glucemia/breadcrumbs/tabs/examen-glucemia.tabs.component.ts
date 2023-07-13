import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'examen-glucemia-tabs',
  templateUrl: './examen-glucemia.tabs.component.html',
  styleUrls: ['./examen-glucemia.tabs.component.css'],
})
export class ExamenesGlucemiaTabsComponent implements OnInit {
  @Input() route: string = '';
   currentYear = this.getYear();
  constructor() {}

  ngOnInit(): void {}
  getYear() {
    return new Date().getFullYear();
  }
}
