import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { data } from './data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposJefesHogar',
  templateUrl: './tipos-jefes-hogar.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposJefesHogarComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposJefesHogarComboboxComponent
  implements OnDestroy, ControlValueAccessor
{
  // validators
  householdHeadFormControl = new FormControl('');
  tiposJefeHogar: any[] = data;

  constructor() {}

  private sub?: Subscription;
  onTouchedCb?: () => void;

  writeValue(obj: any): void {
    this.householdHeadFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.sub = this.householdHeadFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.householdHeadFormControl.disable()
      : this.householdHeadFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  IsDisabled(): void {
    if (this.tiposJefeHogar == null || this.tiposJefeHogar.length == 0) {
      this.householdHeadFormControl.disable();
    }
  }
}
