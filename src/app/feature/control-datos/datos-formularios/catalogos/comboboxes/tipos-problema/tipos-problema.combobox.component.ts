import { Component, EventEmitter, Input, OnDestroy, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { data } from './data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposProblema',
  templateUrl: './tipos-problema.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposProblemaComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposProblemaComboboxComponent
  implements OnDestroy, ControlValueAccessor
{
  // validators
  diabetesProblemsTypesFormControl = new FormControl('');

  tiposProblema: any[] = data;

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor() {}

  writeValue(obj: any): void {
    this.diabetesProblemsTypesFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.sub = this.diabetesProblemsTypesFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.diabetesProblemsTypesFormControl.disable()
      : this.diabetesProblemsTypesFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  IsDisabled(): void {
    if (this.tiposProblema == null || this.tiposProblema.length == 0) {
      this.diabetesProblemsTypesFormControl.disable();
    }
  }
}
