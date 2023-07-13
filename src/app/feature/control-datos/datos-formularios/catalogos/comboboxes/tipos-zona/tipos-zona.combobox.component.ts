import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { data } from './data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposZona',
  templateUrl: './tipos-zona.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposZonaComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposZonaComboboxComponent
  implements OnDestroy, ControlValueAccessor
{
  // validators
  housingZoneFormControl = new FormControl('');

  tiposZona: any[] = data;

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor() {}

  writeValue(obj: any): void {
    this.housingZoneFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.sub = this.housingZoneFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.housingZoneFormControl.disable()
      : this.housingZoneFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  IsDisabled(): void {
    if (this.tiposZona == null || this.tiposZona.length == 0) {
      this.housingZoneFormControl.disable();
    }
  }
}
