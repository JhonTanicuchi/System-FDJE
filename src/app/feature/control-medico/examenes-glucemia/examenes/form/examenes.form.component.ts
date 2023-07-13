import { Patient } from 'src/app/feature/pacientes/paciente';
// importaciones de @angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// importaciones de @angular/material
import { MatDialog } from '@angular/material/dialog';

// importaciones de los servicios y modelos
import { TestsService } from '../examen.service';
import { Test } from '../examen';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';
import { PacienteService } from 'src/app/feature/pacientes/paciente.service';
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
  selector: 'app-examenes-form',
  templateUrl: './examenes.form.component.html',
  styleUrls: ['./examenes.form.component.css'],
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
export class ExamenesFormComponent implements OnInit {
  currentTest = {} as Test;
  title: string;
  matcher = new MyErrorStateMatcher();
  loading: boolean = true;

  public formGroup: FormGroup;
  paramsSubscription: any;

  params_patient_id: number;
  params_test_id: number;

  test_last: Test;

  exams_completed: number = 0;

  exams_missing: number = 0;

  constructor(
    private testsService: TestsService,
    private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      ophthalmologist: ['no', Validators.required],
      ophthalmologist_date: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, maxDateTodayValidator()],
      ],
      nephrologist: ['no', Validators.required],
      nephrologist_date: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, maxDateTodayValidator()],
      ],
      podiatrist: ['no', Validators.required],
      podiatrist_date: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, maxDateTodayValidator()],
      ],
      lipidic: ['no', Validators.required],
      lipidic_date: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, maxDateTodayValidator()],
      ],
      thyroid: ['no', Validators.required],
      thyroid_date: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, maxDateTodayValidator()],
      ],
      state: ['', Validators.required],
      observations: [''],
      patient: [null, Validators.required],
      archived: [false],
      created_at: [null],
    });

    this.formGroup.valueChanges.subscribe((val) => {
      this.currentTest = val;

      this.currentTest.ophthalmologist_date = new Date(
        this.formGroup.get('ophthalmologist_date')?.value
      );
      this.currentTest.nephrologist_date = new Date(
        this.formGroup.get('nephrologist_date')?.value
      );
      this.currentTest.podiatrist_date = new Date(
        this.formGroup.get('podiatrist_date')?.value
      );
      this.currentTest.lipidic_date = new Date(
        this.formGroup.get('lipidic_date')?.value
      );
      this.currentTest.thyroid_date = new Date(
        this.formGroup.get('thyroid_date')?.value
      );

      const formGroup = this.formGroup;
      const examProperties = Object.keys(formGroup.controls);

      let examsCompleted = 0;
      let examsMissing = 5;
      let examsNotApply = 0;

      examProperties.forEach((property) => {
        const control = formGroup.get(property);
        const dateControl = formGroup.get(property + '_date');
        if (control?.value === 'si' && dateControl?.value) {
          const date = new Date(dateControl.value);
          if (date instanceof Date && !isNaN(date.getTime())) {
            examsCompleted++;
          }
        }
        if (control?.value === 'no aplica') {
          examsNotApply++;
        }
      });

      this.exams_missing = examsMissing - examsNotApply - examsCompleted;
      this.exams_completed = examsCompleted;
    });

    const examProperties = [
      'ophthalmologist',
      'nephrologist',
      'podiatrist',
      'lipidic',
      'thyroid',
    ];

    for (const property of examProperties) {
      this.formGroup.get(property)?.valueChanges.subscribe((value) => {
        if (value !== 'si') {
          this.formGroup.get(`${property}_date`)?.patchValue('');
          this.formGroup.get(`${property}_date`)?.disable();
        } else {
          this.formGroup.get(`${property}_date`)?.enable();
        }
      });
    }
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.params_patient_id = params['patient_id'];
        this.params_test_id = params['test_id'];

        if (this.params_patient_id && !this.params_test_id) {
          this.getPatient(this.params_patient_id);
          this.title = 'Nuevo registro de exámenes';
        } else if (this.params_test_id && this.params_test_id) {
          this.getTest(params['test_id']);
          this.title = 'Registro de exámenes';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.currentTest.id) {
        this.createTest();
      } else {
        this.updateTest();
      }
    }
  }

  getPatient(id: number) {
    this.pacienteService.getPaciente(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentTest.patient = res.data.patient;
        this.formGroup.patchValue({ patient: res.data.patient });
        this.getTestLast(this.currentTest.patient.id);
      }
    });
  }

  //Para obtener toda la informacion de la entrega de a
  getTest(id: number) {
    this.testsService.getTest(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentTest = res.data.test;
        this.test_last = res.data.test_last;
        this.formGroup.patchValue(this.currentTest);
        this.getPatient(this.currentTest.patient.id);
        this.getTestLast(this.currentTest.patient.id);
      }
    });
  }

  getTestLast(id: number) {
    this.testsService.getTestLast(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.test_last = res.data.Test_last;
      }
      this.loading = false;
    });
  }

  //método para crear un seguimiento de examenes nuevo
  createTest() {
    console.log(this.currentTest);
    this.testsService.createTest(this.currentTest).subscribe((res: any) => {
      if (res.status === 'success') {
        this.router.navigate([
          '/system/control-medico/examenes-glucemia/examenes/follow',
        ]);
      }
    });
  }

  //método para actualizar un examen de glucemia existente
  updateTest() {
    this.testsService
      .updateTest(this.currentTest.id, this.currentTest)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate([
            '/system/control-medico/examenes-glucemia/examenes/follow',
          ]);
        }
      });
  }

  archiveTest(test: Test): void {
    this.testsService.archiveTest(test.id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.router.navigate([
          '/system/control-medico/examenes-glucemia/examenes/follow',
        ]);
      }
    });
  }

  openDialogArchiveTest(test: Test): void {
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
        this.archiveTest(test);
      }
    });
  }
}
