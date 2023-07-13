import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class DFMainComponent implements OnInit {
  key: string;

  constructor() {}

  ngOnInit(): void {}

  receiveKey($event: any) {
    this.key = $event;
  }
}
