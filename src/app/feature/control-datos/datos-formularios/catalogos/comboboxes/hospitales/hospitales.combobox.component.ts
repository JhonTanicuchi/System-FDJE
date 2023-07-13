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
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';

@Component({
  selector: 'combobox-hospitales',
  templateUrl: './hospitales.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HospitalesComboboxComponent),
      multi: true,
    },
  ],
})
export class HospitalesComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  hospitalFormControl = new FormControl<string | Catalog>('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);

  filteredOptions: Observable<Catalog[]>;
  hospitales: Catalog[] = [];

  matcher = new MyErrorStateMatcher();

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.hospitalFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.sub = this.hospitalFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.hospitalFormControl.disable()
      : this.hospitalFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    this.getHospitales();
  }

  displayFn(hospital: Catalog): string {
    return hospital && hospital.value ? hospital.value : '';
  }

  getHospitales(): void {
    this.catalogService
      .getCatalogsByType('hospitales')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hospitales = res.data.catalogs;
          setTimeout(() => {
            this.filteredOptions = this.hospitalFormControl.valueChanges.pipe(
              startWith(''),
              map((term) => {
                const value = typeof term === 'string' ? term : term?.value;
                return value ? this._filter(value) : this.hospitales.slice();
              })
            );
          }, 100);
        }
      });
  }

  private _filter(value: string): Catalog[] {
    const filterValue = value.toLowerCase();
    return this.hospitales.filter((hospital) =>
      hospital.value.toLowerCase().includes(filterValue)
    );
  }

  IsDisabled(): void {
    if (this.hospitales == null || this.hospitales.length == 0) {
      this.hospitalFormControl.disable();
    }
  }
}
