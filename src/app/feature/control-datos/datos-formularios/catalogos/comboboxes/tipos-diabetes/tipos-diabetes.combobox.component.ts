import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
  selector: 'combobox-tiposDiabetes',
  templateUrl: './tipos-diabetes.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposDiabetesComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposDiabetesComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  diabetesTypeFormControl = new FormControl('', [Validators.required]);

  tiposDiabetes: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogoService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.diabetesTypeFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.diabetesTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.diabetesTypeFormControl.disable()
      : this.diabetesTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTiposDiabetes();
  }

  getTiposDiabetes(): void {
    this.catalogoService
      .getCatalogsByType('tipos-diabetes')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.tiposDiabetes = res.data.catalogs;
          this.IsDisabled();
        }
      });
  }

  IsDisabled(): void {
    if (this.tiposDiabetes == null || this.tiposDiabetes.length == 0) {
      this.diabetesTypeFormControl.disable();
    }
  }
}
