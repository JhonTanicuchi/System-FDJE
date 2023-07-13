import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
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
  selector: 'combobox-regions',
  templateUrl: './regiones.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionsComboboxComponent),
      multi: true,
    },
  ],
})
export class RegionsComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  regionFormControl = new FormControl('', [Validators.required]);

  regions: Catalog[] = [];

  private sub?: Subscription;
  //propiedad privada que contiene una referencia a la suscripción que se crea cuando roleFormControl cambia el valor.
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.regionFormControl.setValue(obj.id);
  }
  //registra una función que será llamada cuando el valor de los roleFormControl cambia
  registerOnChange(fn: any): void {
    this.sub = this.regionFormControl.valueChanges.subscribe(fn);
  }
  //registra una función que será llamada cuando se toque el control. La función se almacena en la onTouchedCbpropiedad para su uso posterior
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  // este método se usa para habilitar o deshabilitar el control según el isDisabledState booleano pasado.
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.regionFormControl.disable()
      : this.regionFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  getIdentificationTypes(): void {
    this.catalogService.getCatalogsByType('regiones').subscribe((res: any) => {
      if (res.status === 'success') {
        this.regions = res.data.catalogs;
        this.IsDisabled();
      }
    });
  }
  IsDisabled(): void {
    if (this.regions == null || this.regions.length == 0) {
      this.regionFormControl.disable();
    }
  }
}
