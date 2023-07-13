import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// importaciones de los servicios y modelos
import { Patient } from '../paciente';
import { PacienteService } from '../paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// importaciones de los validadores
import { checkIdentificationIsAvailable } from './validators/check-identification-available.async.validator';
import { udvEcIdentification } from '../../personal/usuarios/form/validators/udv-ec-identification.async.validator';
import { checkEmailIsAvailable } from './validators/check-email-available.async.validator';
import { CatalogService } from '../../control-datos/datos-formularios/catalogos/catalogo.service';
import { normalize } from 'src/app/shared/helpers/normalize.str.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { maxDateTodayValidator } from './validators/check-date.validator';
import { ageValidator } from './validators/check-birthday.validator';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';

@Component({
  selector: 'paciente-form',
  templateUrl: './paciente.form.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class PacientesFormComponent implements OnInit {
  @ViewChild('form') form: ElementRef;

  currentPatient = {} as Patient;

  @Output() patientEmitter = new EventEmitter<Patient>();

  formGroup: FormGroup;

  // loader
  @Output() loading: boolean = true;
  // title
  title = 'Nuevo Paciente';

  tab: number = 1;

  constructor(
    public pacientesService: PacienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleTab: Title,
    public formBuilder: FormBuilder,
    public catalogService: CatalogService,
    public dialog: MatDialog
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      email: [
        '',
        {
          validators: [
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
          ],
          asyncValidators: [
            (control: any) =>
              checkEmailIsAvailable(
                this.pacientesService,
                this.currentPatient.id
              )(control),
          ],
          updateOn: 'change',
        },
      ],
      type: ['', Validators.required],
      person: this.formBuilder.group({
        identification_type: ['', Validators.required],
        identification: [
          {
            value: '',
            disabled: true,
          },
          {
            validators: [Validators.required],
            asyncValidators: [
              (control: any) =>
                checkIdentificationIsAvailable(
                  this.pacientesService,
                  this.currentPatient.id
                )(control),
              udvEcIdentification(),
            ],
            updateOn: 'change',
          },
        ],
        names: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern('[A-Za-záéíóúñÁÉÍÓÚÑ ]{3,40}'),
            ],
          },
        ],
        last_names: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern('[A-Za-záéíóúñÁÉÍÓÚÑ ]{3,40}'),
            ],
          },
        ],
        gender: [''],
        date_birth: ['', ageValidator(3)],
        place_birth: [''],
        disability: ['no', Validators.required],
        nationality: ['', Validators.required],
        address: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ],
        ],
        region: ['', Validators.required],
        province: [
          {
            value: '',
            disabled: true,
          },
          Validators.required,
        ],
        canton: [
          {
            value: '',
            disabled: true,
          },
          Validators.required,
        ],
        parish: [
          {
            value: '',
            disabled: true,
          },
          Validators.required,
        ],
        mobile_phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{3}[0-9]{7}$'),
          ],
        ],
        landline_phone: ['', Validators.pattern('[0-9]{10,15}')],
      }),
      medical_record: this.formBuilder.group({
        weight: [
          '',
          [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)],
        ],
        size: [
          '',
          [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)],
        ],
        diabetes_type: ['', Validators.required],
        last_hb_test: ['', [Validators.required, maxDateTodayValidator()]],
        diagnosis_date: ['', [Validators.required, maxDateTodayValidator()]],
        diagnostic_period: ['', Validators.required],
        hb_value: [
          '',
          [Validators.required, Validators.min(4.5), Validators.max(25)],
        ],
        glucose_checks: [
          '',
          [Validators.required, Validators.min(1), Validators.max(100)],
        ],
        written_record: ['', Validators.required],
        single_measurement: ['', Validators.required],
        monitoring_system: ['', Validators.required],
        basal_insulin_type: ['', Validators.required],
        morning_basal_dose: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        evening_basal_dose: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        prandial_insulin_type: ['', Validators.required],
        breakfast_prandial_dose: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        lunch_prandial_dose: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        dinner_prandial_dose: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        correction_prandial_dose: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        has_convulsions: ['', Validators.required],
        hypoglycemia_symptoms: ['', Validators.required],
        hypoglycemia_frequency: [''],
        min_hypoglycemia: [''],
        hypoglycemia_treatment: [''],
        doctor: ['', Validators.required],
        last_visit: ['', [Validators.required, maxDateTodayValidator()]],
        hospital_type: ['', Validators.required],
        hospital: ['', Validators.required],
        other_disease: [''],
        assistance_type: ['', Validators.required],
      }),
      family_record: this.formBuilder.group({
        id: [''],
        household_head: [''],
        housing_zone: [''],
        housing_type: [''],
        members: [''],
        contributions: [''],
        minors: [''],
        members_disability: [''],
        diabetes_problem: [''],
        legal_representative: this.formBuilder.group({
          relationship: [
            {
              value: '',
              disabled: true,
            },
            Validators.required,
          ],
          person: this.formBuilder.group({
            identification_type: [
              {
                value: '',
                disabled: true,
              },
              Validators.required,
            ],
            identification: [
              {
                value: '',
                disabled: true,
              },
              {
                validators: [Validators.required],
                asyncValidators: [udvEcIdentification()],
                updateOn: 'change',
              },
            ],
            names: [
              {
                value: '',
                disabled: true,
              },
              {
                validators: [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.pattern('[A-Za-záéíóúñÁÉÍÓÚÑ ]{3,40}'),
                ],
              },
            ],
            last_names: [
              {
                value: '',
                disabled: true,
              },
              {
                validators: [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.pattern('[A-Za-záéíóúñÁÉÍÓÚÑ ]{3,40}'),
                ],
              },
            ],
            nationality: [
              {
                value: '',
                disabled: true,
              },
              Validators.required,
            ],
            mobile_phone: [
              {
                value: '',
                disabled: true,
              },
              [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.pattern('^[0-9]{3}[0-9]{7}$'),
              ],
            ],
            landline_phone: ['', Validators.pattern('[0-9]{10,15}')],
          }),
        }),
      }),
    });

    this.formGroup.valueChanges.subscribe((data) => {
      this.currentPatient = data;
      this.currentPatient.person.date_birth =
        this.formGroup.get('person.date_birth')?.value;
      this.currentPatient.medical_record.diagnosis_date = this.formGroup.get(
        'medical_record.diagnosis_date'
      )?.value;
      this.currentPatient.medical_record.last_hb_test = this.formGroup.get(
        'medical_record.last_hb_test'
      )?.value;
      this.currentPatient.medical_record.last_visit = this.formGroup.get(
        'medical_record.last_visit'
      )?.value;
      console.log(this.currentPatient);
    });

    this.formGroup.get('person.disability')?.valueChanges.subscribe((value) => {
      const legalRepresentativeControls = [
        'relationship',
        'person.identification_type',
        'person.names',
        'person.last_names',
        'person.nationality',
        'person.mobile_phone',
        'person.landline_phone',
      ];

      const disableLegalRepresentativeControls = () => {
        legalRepresentativeControls.forEach((controlName) => {
          this.formGroup
            .get(`family_record.legal_representative.${controlName}`)
            ?.disable();
          this.formGroup
            .get('family_record.legal_representative.person.identification')
            ?.disable();
        });
      };

      const enableLegalRepresentativeControls = () => {
        legalRepresentativeControls.forEach((controlName) => {
          this.formGroup
            .get(`family_record.legal_representative.${controlName}`)
            ?.enable();
        });
      };

      if (value === 'no') {
        disableLegalRepresentativeControls();
      } else if (value === 'si') {
        enableLegalRepresentativeControls();
      }
    });

    this.formGroup.get('person.date_birth')?.valueChanges.subscribe((value) => {
      const legalRepresentativeControls = [
        'relationship',
        'person.identification_type',
        'person.names',
        'person.last_names',
        'person.nationality',
        'person.mobile_phone',
        'person.landline_phone',
      ];

      const disableLegalRepresentativeControls = () => {
        legalRepresentativeControls.forEach((controlName) => {
          this.formGroup
            .get(`family_record.legal_representative.${controlName}`)
            ?.disable();
          this.formGroup
            .get('family_record.legal_representative.person.identification')
            ?.disable();
        });
      };

      const enableLegalRepresentativeControls = () => {
        legalRepresentativeControls.forEach((controlName) => {
          this.formGroup
            .get(`family_record.legal_representative.${controlName}`)
            ?.enable();
        });
      };

      if (this.isAdult(value)) {
        disableLegalRepresentativeControls();
      } else if (!this.isAdult(value)) {
        enableLegalRepresentativeControls();
      }
    });

    this.formGroup.get('person.address')?.statusChanges.subscribe((status) => {
      if (status === 'VALID' && this.formGroup.get('person.address')?.value) {
        this.formGroup.get('person.province')?.enable();
        this.formGroup.get('person.canton')?.enable();
        this.formGroup.get('person.parish')?.enable();
      } else {
        this.formGroup.get('person.province')?.disable();
        this.formGroup.get('person.canton')?.disable();
        this.formGroup.get('person.parish')?.disable();
      }
    });

    this.formGroup
      .get('person.identification_type')
      ?.valueChanges.subscribe((identificationTypeId) => {
        this.formGroup.get('person.identification')?.enable();
        this.catalogService
          .getCatalogItem(identificationTypeId)
          .subscribe((identificationType) => {
            const identificationControl = this.formGroup.get(
              'person.identification'
            );
            if (normalize(identificationType?.value) === 'cedula') {
              identificationControl?.setValidators([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
              ]);
              identificationControl?.setAsyncValidators([
                udvEcIdentification(),
                (control: any) =>
                  checkIdentificationIsAvailable(
                    this.pacientesService,
                    this.currentPatient.id
                  )(control),
              ]);
            } else {
              identificationControl?.clearValidators();
              identificationControl?.setValidators([Validators.required]);
              identificationControl?.clearAsyncValidators();
              identificationControl?.setAsyncValidators([
                (control: any) =>
                  checkIdentificationIsAvailable(
                    this.pacientesService,
                    this.currentPatient.id
                  )(control),
              ]);
            }
            identificationControl?.updateValueAndValidity();
          });
      });
    this.formGroup
      .get('family_record.legal_representative.person.identification_type')
      ?.valueChanges.subscribe((identificationTypeId) => {
        console.log(
          this.formGroup.get('person.disability')?.value === 'si',
          this.formGroup.get(
            'family_record.legal_representative.person.identification_type'
          )?.value !== '',
          !this.isAdult(this.formGroup.get('person.date_birth')?.value)
        );
        if (
          (this.formGroup.get('person.disability')?.value === 'si' &&
            this.formGroup.get(
              'family_record.legal_representative.person.identification_type'
            )?.value !== '') ||
          (!this.isAdult(this.formGroup.get('person.date_birth')?.value) &&
            this.formGroup.get(
              'family_record.legal_representative.person.identification_type'
            )?.value !== '')
        ) {
          this.formGroup
            .get('family_record.legal_representative.person.identification')
            ?.enable();
          this.catalogService
            .getCatalogItem(identificationTypeId)
            .subscribe((identificationType) => {
              const identificationControl = this.formGroup.get(
                'family_record.legal_representative.person.identification'
              );
              if (normalize(identificationType?.value) === 'cedula') {
                identificationControl?.setValidators([
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(10),
                ]);
                identificationControl?.setAsyncValidators([
                  udvEcIdentification(),
                ]);
              } else {
                identificationControl?.clearValidators();
                identificationControl?.setValidators([Validators.required]);
                identificationControl?.clearAsyncValidators();
              }
              identificationControl?.updateValueAndValidity();
            });
        }
      });

    this.formGroup
      .get('medical_record.basal_insulin_type')
      ?.valueChanges.subscribe((id) => {
        this.catalogService.getCatalogItem(id).subscribe((insulin_type) => {
          const morning_basal_dose = this.formGroup.get(
            'medical_record.morning_basal_dose'
          );
          const evening_basal_dose = this.formGroup.get(
            'medical_record.evening_basal_dose'
          );
          if (normalize(insulin_type?.value) === 'ninguna') {
            morning_basal_dose?.patchValue('');
            evening_basal_dose?.patchValue('');
            morning_basal_dose?.disable();
            evening_basal_dose?.disable();
          } else {
            morning_basal_dose?.enable();
            evening_basal_dose?.enable();
          }
        });
      });

    this.formGroup
      .get('medical_record.prandial_insulin_type')
      ?.valueChanges.subscribe((id) => {
        this.catalogService.getCatalogItem(id).subscribe((insulin_type) => {
          const breakfast_prandial_dose = this.formGroup.get(
            'medical_record.breakfast_prandial_dose'
          );
          const lunch_prandial_dose = this.formGroup.get(
            'medical_record.lunch_prandial_dose'
          );
          const dinner_prandial_dose = this.formGroup.get(
            'medical_record.dinner_prandial_dose'
          );
          const correction_prandial_dose = this.formGroup.get(
            'medical_record.correction_prandial_dose'
          );
          if (normalize(insulin_type?.value) === 'ninguna') {
            breakfast_prandial_dose?.patchValue('');
            lunch_prandial_dose?.patchValue('');
            dinner_prandial_dose?.patchValue('');
            correction_prandial_dose?.patchValue('');

            breakfast_prandial_dose?.disable();
            lunch_prandial_dose?.disable();
            dinner_prandial_dose?.disable();
            correction_prandial_dose?.disable();
          } else {
            breakfast_prandial_dose?.enable();
            lunch_prandial_dose?.enable();
            dinner_prandial_dose?.enable();
            correction_prandial_dose?.enable();
          }
        });
      });
  }

  ngOnInit(): void {
    // obtención de los parámetros de la url para la edición de usuarios
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.title = 'Editar Paciente';
        this.getPaciente(params.id);
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.currentPatient.id) {
        this.addPaciente();
      } else {
        this.updatePaciente();
      }
    }
  }

  // método para obtener un paciente
  getPaciente(id: number) {
    this.loading = true;
    this.pacientesService.getPaciente(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentPatient = res.data.patient;
        this.formGroup.patchValue(this.currentPatient);
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  // método para guardar un paciente
  addPaciente() {
    this.pacientesService
      .addPaciente(this.currentPatient)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          if (this.router.url === '/system/pacientes/form') {
            this.router.navigate(['/system/pacientes']);
          } else {
            localStorage.setItem('patientCreated', 'true');
            this.router.navigate(['/registro/exitoso']);
          }
        }
      });
  }

  // método para actualizar un paciente
  updatePaciente() {
    this.pacientesService
      .updatePaciente(this.currentPatient)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/system/pacientes']);
        }
      });
  }

  archivePaciente(paciente: Patient): void {
    this.pacientesService.archivePaciente(paciente.id).subscribe((res: any) => {
      if (res.status == 'success') {
        this.router.navigate(['/system/pacientes']);
      }
    });
  }

  openDialogArchivePaciente(paciente: Patient): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar el usuario?',
        message: 'El usuario será eliminado y no podrá ser recuperado',
        dato: paciente.person.names + ' ' + paciente.person.last_names,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.archivePaciente(paciente);
      }
    });
  }

  nextTab(): void {
    this.tab = this.tab + 1;
    window.scrollTo(0, 0);
    if (this.form) {
      this.form.nativeElement.scrollTop = 0;
    }
  }

  previousTab(): void {
    this.tab = this.tab - 1;
    window.scrollTo(0, 0);
    if (this.form) {
      this.form.nativeElement.scrollTop = 0;
    }
  }

  receiveTab($event: any) {
    this.tab = $event;
    if (this.form) {
      this.form.nativeElement.scrollTop = 0;
    }
  }

  isAdult(birthdate: Date): boolean {
    const fechaNacimiento = new Date(birthdate);
    const now = new Date();
    const ageInMilliseconds = now.getTime() - fechaNacimiento.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);

    return ageInYears >= 18;
  }
}
