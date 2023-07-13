import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Catalog } from '../../catalogo';
import { CatalogService } from '../../catalogo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposInsulinaBasal',
  templateUrl: './tipos-insulina-basal.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposInsulinaBasalComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposInsulinaBasalComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  basalInsulinTypeFormControl = new FormControl('', [Validators.required]);

  tiposInsulinaBasal: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.basalInsulinTypeFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.basalInsulinTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.basalInsulinTypeFormControl.disable()
      : this.basalInsulinTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTiposInsulinaBasal();
  }

  getTiposInsulinaBasal(): void {
    this.catalogService
      .getCatalogsByType('tipos-insulina-basal')
      .subscribe(
        (res:any) => {
          if (res.status === 'success') {
            this.tiposInsulinaBasal = res.data.catalogs;
            this.IsDisabled();
          }
        }
      );
  }

  IsDisabled(): void {
    if (
      this.tiposInsulinaBasal == null ||
      this.tiposInsulinaBasal.length == 0
    ) {
      this.basalInsulinTypeFormControl.disable();
    }
  }
}
