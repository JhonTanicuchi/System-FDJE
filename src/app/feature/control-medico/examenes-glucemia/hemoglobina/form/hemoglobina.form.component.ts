import { PacienteService } from 'src/app/feature/pacientes/paciente.service';
import { HemoglobinTest } from './../hemoglobina';
// importaciones de @angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// importaciones de los servicios y modelos
import { HemoglobinTestsService } from '../hemoglobina.service';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';
import { MatDialog } from '@angular/material/dialog';

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
import { maxDateTodayValidator } from 'src/app/feature/pacientes/form/validators/check-date.validator';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';

@Component({
  selector: 'app-hemoglobina-form',
  templateUrl: './hemoglobina.form.component.html',
  styleUrls: ['./hemoglobina.form.component.css'],
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
export class HemoglobinaFormComponent implements OnInit {
  currentHemoglobinTest = {} as HemoglobinTest;
  title: string;
  matcher = new MyErrorStateMatcher();
  loading: boolean = true;

  public formGroup: FormGroup;
  paramsSubscription: any;

  params_patient_id: number;
  params_test_id: number;

  hemoglobinTest_last: HemoglobinTest;

  constructor(
    private pacienteService: PacienteService,
    private hemoglobinTestsService: HemoglobinTestsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      hb1ac_result: ['', Validators.required],
      hb1ac_date: ['', [Validators.required, maxDateTodayValidator()]],
      endocrinologist_date: [
        '',
        [Validators.required, maxDateTodayValidator()],
      ],
      weight: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          Validators.min(0),
        ],
      ],
      size: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          Validators.min(0),
        ],
      ],
      state: ['', Validators.required],
      observations: [''],
      archived: [false],
      patient: [null, Validators.required],
    });
    this.formGroup.valueChanges.subscribe((val) => {
      this.currentHemoglobinTest = val;
      this.currentHemoglobinTest.hb1ac_date =
        this.formGroup.get('hb1ac_date')?.value;
      this.currentHemoglobinTest.endocrinologist_date = this.formGroup.get(
        'endocrinologist_date'
      )?.value;
    });
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.params_patient_id = params['patient_id'];
        this.params_test_id = params['test_id'];

        if (this.params_patient_id && !this.params_test_id) {
          this.getPatient(this.params_patient_id);
          this.title = 'Nuevo registro de hemoglobina';
        } else if (this.params_test_id && this.params_test_id) {
          this.getHemoglobinTest(params['test_id']);
          this.title = 'Registro de hemoglobina';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.currentHemoglobinTest.id) {
        this.createHemoglobinTest();
      } else {
        this.updateHemoglobinTest();
      }
    }
  }

  getPatient(id: number) {
    this.pacienteService.getPaciente(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentHemoglobinTest.patient = res.data.patient;
        this.formGroup.patchValue({ patient: res.data.patient });
        this.getHemoglobinTestLast(this.currentHemoglobinTest.patient.id);
      }
    });
  }

  //Para obtener toda la informacion de la entrega de hemoglobina
  getHemoglobinTest(id: number) {
    this.hemoglobinTestsService.getHemoglobinTest(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentHemoglobinTest = res.data.hemoglobin_test;
        this.hemoglobinTest_last = res.data.hemoglobinTest_last;
        this.formGroup.patchValue(this.currentHemoglobinTest);
        this.getPatient(this.currentHemoglobinTest.patient.id);
        this.getHemoglobinTestLast(this.currentHemoglobinTest.patient.id);
      }
    });
  }

  getHemoglobinTestLast(id: number) {
    this.hemoglobinTestsService
      .getHemoglobinTestLast(id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hemoglobinTest_last = res.data.hemoglobinTest_last;
        }
        this.loading = false;
      });
  }

  //método para crear un seguimiento de examenes nuevo
  createHemoglobinTest() {
    console.log(this.currentHemoglobinTest);
    this.hemoglobinTestsService
      .createHemoglobinTest(this.currentHemoglobinTest)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate([
            '/system/control-medico/examenes-glucemia/examenes_hemoglobina/follow',
          ]);
        }
      });
  }

  //método para actualizar un examen de glucemia existente
  updateHemoglobinTest() {
    this.hemoglobinTestsService
      .updateHemoglobinTest(
        this.currentHemoglobinTest.id,
        this.currentHemoglobinTest
      )
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate([
            '/system/control-medico/examenes-glucemia/examenes_hemoglobina/follow',
          ]);
        }
      });
  }

  archiveHemoglobinTest(test: HemoglobinTest): void {
    this.hemoglobinTestsService
      .archiveHemoglobinTest(test.id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate([
            '/system/control-medico/examenes-glucemia/examenes_hemoglobina/follow',
          ]);
        }
      });
  }

  openDialogArchiveHemoglobinTest(test: HemoglobinTest): void {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar este examen?',
        message: 'El examen será eliminado y no podrá ser recuperado',

        dato: 'Examen del :' + test.created_at,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.archiveHemoglobinTest(test);
      }
    });
  }
}
