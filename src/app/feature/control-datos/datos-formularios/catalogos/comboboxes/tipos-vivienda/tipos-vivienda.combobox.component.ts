import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { data } from './data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposVivienda',
  templateUrl: './tipos-vivienda.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposViviendaComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposViviendaComboboxComponent
  implements OnDestroy, ControlValueAccessor
{
  // validators
  housingTypeFormControl = new FormControl('');
  tiposVivienda: any[] = data;

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor() {}

  writeValue(obj: any): void {
    this.housingTypeFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.sub = this.housingTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.housingTypeFormControl.disable()
      : this.housingTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  IsDisabled(): void {
    if (this.tiposVivienda == null || this.tiposVivienda.length == 0) {
      this.housingTypeFormControl.disable();
    }
  }
}
