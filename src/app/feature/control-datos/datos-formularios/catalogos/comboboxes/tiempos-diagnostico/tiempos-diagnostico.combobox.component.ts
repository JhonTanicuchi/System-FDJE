import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Catalog } from '../../catalogo';
import { CatalogService } from '../../catalogo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'combobox-tiemposDiagnostico',
  templateUrl: './tiempos-diagnostico.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiemposDiagnosticoComboboxComponent),
      multi: true,
    },
  ],
})
export class TiemposDiagnosticoComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  diagnosticPeriodFormControl = new FormControl('', [Validators.required]);
  tiemposDiagnostico: Catalog[] = [];

  private sub?: Subscription;
  //propiedad privada que contiene una referencia a la suscripción que se crea cuando roleFormControl cambia el valor.
  onTouchedCb?: () => void;
  constructor(private catalogoService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.diagnosticPeriodFormControl.setValue(obj.id);
  }
  //registra una función que será llamada cuando el valor de los roleFormControl cambia
  registerOnChange(fn: any): void {
    this.sub = this.diagnosticPeriodFormControl.valueChanges.subscribe(fn);
  }
  //registra una función que será llamada cuando se toque el control. La función se almacena en la onTouchedCbpropiedad para su uso posterior
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  // este método se usa para habilitar o deshabilitar el control según el isDisabledState booleano pasado.
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.diagnosticPeriodFormControl.disable()
      : this.diagnosticPeriodFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTiemposDiagnostico();
  }

  getTiemposDiagnostico(): void {
    this.catalogoService
      .getCatalogsByType('tiempo-diagnostico')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.tiemposDiagnostico = res.data.catalogs;
          this.IsDisabled();
        }
      });
  }

  IsDisabled(): void {
    if (
      this.tiemposDiagnostico == null ||
      this.tiemposDiagnostico.length == 0
    ) {
      this.diagnosticPeriodFormControl.disable();
    }
  }
}
