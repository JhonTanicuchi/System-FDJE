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
  selector: 'combobox-nationality-types',
  templateUrl: './tipos-nacionalidad.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NationalityTypesComboboxComponent),
      multi: true,
    },
  ],
})
export class NationalityTypesComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  nationalityTypeFormControl = new FormControl('', [Validators.required]);

  nationalities: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.nationalityTypeFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.nationalityTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.nationalityTypeFormControl.disable()
      : this.nationalityTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getNationalities();
  }

  getNationalities(): void {
    this.catalogService
      .getCatalogsByType('tipos-nacionalidad')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.nationalities = res.data.catalogs;
          this.IsDisabled();
        }
      });
  }

  IsDisabled(): void {
    if (this.nationalities == null || this.nationalities.length == 0) {
      this.nationalityTypeFormControl.disable();
    }
  }
}
