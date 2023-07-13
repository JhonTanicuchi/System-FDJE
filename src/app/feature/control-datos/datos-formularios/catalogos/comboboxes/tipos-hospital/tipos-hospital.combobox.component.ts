import {
  Component,
  OnDestroy,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Catalog } from '../../catalogo';
import { CatalogService } from '../../catalogo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiposHospital',
  templateUrl: './tipos-hospital.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposHospitalComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposHospitalComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  hospitalTypeFormControl = new FormControl('', [Validators.required]);

  tiposHospital: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.hospitalTypeFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.hospitalTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.hospitalTypeFormControl.disable()
      : this.hospitalTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTiposHospital();
  }
  getTiposHospital(): void {
    this.catalogService
      .getCatalogsByType('tipos-hospital')
      .subscribe((res:any) => {
          if (res.status === 'success') {
            this.tiposHospital = res.data.catalogs;
            this.IsDisabled();
          }
       });
  }

  IsDisabled(): void {
    if (this.tiposHospital == null || this.tiposHospital.length == 0) {
      this.hospitalTypeFormControl.disable();
    }
  }
}
