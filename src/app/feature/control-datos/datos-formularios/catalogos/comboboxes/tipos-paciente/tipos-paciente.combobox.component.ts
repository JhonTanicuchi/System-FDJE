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
  selector: 'combobox-patient-types',
  templateUrl: './tipos-paciente.combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatientTypesComboboxComponent),
      multi: true,
    },
  ],
})
export class PatientTypesComboboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  // validators
  patientTypeFormControl = new FormControl('', [Validators.required]);

  constructor(private catalogService: CatalogService) {}

  private sub?: Subscription;
  onTouchedCb?: () => void;

  writeValue(obj: any): void {
    obj && this.patientTypeFormControl.setValue(obj.id);
  }
  registerOnChange(fn: any): void {
    this.sub = this.patientTypeFormControl.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.patientTypeFormControl.disable()
      : this.patientTypeFormControl.enable();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  selectedPatientTypeId: any;

  ngOnInit(): void {
    this.getPatientTypes();
  }

  patientTypes: Catalog[] = [];

  @Output() patientTypeIdEmitter = new EventEmitter<number>();
  @Input() patientTypeId: number;

  IsDisabled(): void {
    if (this.patientTypes == null || this.patientTypes.length == 0) {
      this.patientTypeFormControl.disable();
    }
  }

  getPatientTypes(): void {
    this.catalogService
      .getCatalogsByType('tipos-paciente')
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.patientTypes = res.data.catalogs;
          this.IsDisabled();
        }
      });
  }

  PatientTypeIdEmitter(patientTypeId: number): void {
    this.patientTypeIdEmitter.emit(patientTypeId);
  }
}
