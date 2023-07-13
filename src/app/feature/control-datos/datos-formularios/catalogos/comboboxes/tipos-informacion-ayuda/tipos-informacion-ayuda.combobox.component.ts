import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Catalog } from '../../catalogo';
import { CatalogService } from '../../catalogo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposInformacionAyuda',
  templateUrl: './tipos-informacion-ayuda.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposInformacionAyudaComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposInformacionAyudaComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  assistanceTypeFormControl = new FormControl('', [Validators.required]);
  tiposInformacion: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.assistanceTypeFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.assistanceTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.assistanceTypeFormControl.disable()
      : this.assistanceTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTiposInformacion();
  }

  getTiposInformacion(): void {
    this.catalogService
      .getCatalogsByType('tipos-informacion-ayuda')
      .subscribe(
        (res:any) => {
          if (res.status === 'success') {
            this.tiposInformacion = res.data.catalogs;
          }
        });
  }

  IsDisabled(): void {
    if (this.tiposInformacion == null || this.tiposInformacion.length == 0) {
      this.assistanceTypeFormControl.disable();
    }
  }
}
