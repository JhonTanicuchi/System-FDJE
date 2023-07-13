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
  selector: 'combobox-medicos',
  templateUrl: './medicos.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MedicosComboboxComponent),
      multi: true,
    },
  ],
})
export class MedicosComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  medicFormControl = new FormControl<string | Catalog>('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);

  filteredOptions: Observable<Catalog[]>;
  medicos: Catalog[] = [];
  matcher = new MyErrorStateMatcher();

  private sub?: Subscription;
  //propiedad privada que contiene una referencia a la suscripción que se crea cuando roleFormControl cambia el valor.
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.medicFormControl.setValue(obj);
  }
  //registra una función que será llamada cuando el valor de los roleFormControl cambia
  registerOnChange(fn: any): void {
    this.sub = this.medicFormControl.valueChanges.subscribe(fn);
  }
  //registra una función que será llamada cuando se toque el control. La función se almacena en la onTouchedCbpropiedad para su uso posterior
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  // este método se usa para habilitar o deshabilitar el control según el isDisabledState booleano pasado.
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.medicFormControl.disable()
      : this.medicFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getMedicos();
  }

  displayFn(medico: Catalog): string {
    return medico && medico.value ? medico.value : '';
  }
  //getMedicosLa función es un método público que no devuelve nada. Esta función llama getCatalogsByTypeal método catalogServicey se suscribe al resultado.
  getMedicos(): void {
    this.catalogService.getCatalogsByType('medicos').subscribe((res: any) => {
      if (res.status === 'success') {
        this.medicos = res.data.catalogs;
        setTimeout(() => {
          this.filteredOptions = this.medicFormControl.valueChanges.pipe(
            startWith(''),
            map((term) => {
              const value = typeof term === 'string' ? term : term?.value;
              return value ? this._filter(value) : this.medicos.slice();
            })
          );
        }, 100);
      }
    });
  }
  //Si el resultado es exitoso, this.medicosse establece en los catalogsdatos que se devuelven. También se filteredOptionsestablecen en la lista filtrada de medicosbasada en el valueChangesde medicFormControl.
  private _filter(value: string): Catalog[] {
    const filterValue = value.toLowerCase();
    return this.medicos.filter((medico) =>
      medico.value.toLowerCase().includes(filterValue)
    );
  }
  //IsDisabledLa función es un método público que no devuelve nada. Comprueba si this.medicoses nulo o tiene una longitud de 0, y si es verdadero, deshabilita el medicFormControl.
  IsDisabled(): void {
    if (this.medicos == null || this.medicos.length == 0) {
      this.medicFormControl.disable();
    }
  }
  //onOptionSelectedLa función es un método público que no devuelve nada. Se llama cuando un usuario selecciona una opción de la lista filtrada. Actualiza el valor y la validez del medicFormControldespués de un retraso de 0ms.
  onOptionSelected() {
    setTimeout(() => {
      this.medicFormControl.updateValueAndValidity();
    });
  }
}
