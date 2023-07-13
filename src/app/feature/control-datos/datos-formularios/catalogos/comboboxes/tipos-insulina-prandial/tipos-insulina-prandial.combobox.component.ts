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
  selector: 'combobox-tiposInsulinaPrandial',
  templateUrl: './tipos-insulina-prandial.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiposInsulinaPrandialComboboxComponent),
      multi: true,
    },
  ],
})
export class TiposInsulinaPrandialComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  prandialInsulinTypeFormControl = new FormControl('', [Validators.required]);

  tiposInsulinaPrandial: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.prandialInsulinTypeFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.prandialInsulinTypeFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.prandialInsulinTypeFormControl.disable()
      : this.prandialInsulinTypeFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTiposInsulinaPrandial();
  }

  getTiposInsulinaPrandial(): void {
    this.catalogService
      .getCatalogsByType('tipos-insulina-prandial')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.tiposInsulinaPrandial = res.data.catalogs;
        }
      });
  }

  IsDisabled(): void {
    if (
      this.tiposInsulinaPrandial == null ||
      this.tiposInsulinaPrandial.length == 0
    ) {
      this.prandialInsulinTypeFormControl.disable();
    }
  }
}
