import { Component, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { data } from './data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposParentesco',
  templateUrl: './tipos-parentesco.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposParentescoComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposParentescoComboboxComponent
  implements OnDestroy, ControlValueAccessor
{
  // validators
  relationshipFormControl = new FormControl('', [Validators.required]);

  tiposParentesco: any[] = data;

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor() {}

  writeValue(obj: any): void {
    this.relationshipFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.sub = this.relationshipFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.relationshipFormControl.disable()
      : this.relationshipFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  IsDisabled(): void {
    if (this.tiposParentesco == null || this.tiposParentesco.length == 0) {
      this.relationshipFormControl.disable();
    }
  }
}
