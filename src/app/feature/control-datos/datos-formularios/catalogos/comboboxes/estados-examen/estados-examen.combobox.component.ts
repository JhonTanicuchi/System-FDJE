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
  selector: 'combobox-estadosExamen',
  templateUrl: './estados-examen.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EstadosExamenComboboxComponent),
      multi: true,
    },
  ],
})
export class EstadosExamenComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  statesExamFormControl = new FormControl('', [Validators.required]);

  statesExam: Catalog[] = [];

  private sub?: Subscription;
  onTouchedCb?: () => void;

  constructor(private catalogService: CatalogService) {}

  writeValue(obj: any): void {
    obj && this.statesExamFormControl.setValue(obj.id);
  }

  registerOnChange(fn: any): void {
    this.sub = this.statesExamFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.statesExamFormControl.disable()
      : this.statesExamFormControl.enable();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  getIdentificationTypes(): void {
    this.catalogService
      .getCatalogsByType('estados-examen')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.statesExam = res.data.catalogs;
          this.IsDisabled();
        }
      });
  }

  IsDisabled(): void {
    if (this.statesExam == null || this.statesExam.length == 0) {
      this.statesExamFormControl.disable();
    }
  }
}
