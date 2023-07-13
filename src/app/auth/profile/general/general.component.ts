// Importaciones de Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios relacionados con la aplicación
import { AuthService } from 'src/app/auth/auth.service';
import { UsuarioService } from '../../../feature/personal/usuarios/usuario.service';

// Modelos y clases relacionadas con la lógica de negocio de la aplicación
import { User } from '../../../feature/personal/usuarios/usuario';
import { checkIdentificationIsAvailable } from '../../../feature/personal/usuarios/form/validators/check-identification-available.async.validator';
import { udvEcIdentification } from '../../../feature/personal/usuarios/form/validators/udv-ec-identification.async.validator';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';
import { normalize } from 'src/app/shared/helpers/normalize.str.component';
import { CatalogService } from '../../../feature//control-datos/datos-formularios/catalogos/catalogo.service';
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
import { ageValidator } from 'src/app/feature/pacientes/form/validators/check-birthday.validator';
@Component({
  selector: 'perfil-general',
  templateUrl: './general.component.html',
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
export class ProfilePersonalDataComponent implements OnInit {
  // Variables de clase que son inyectadas
  currentUser = {} as User;

  loading: boolean = true;

  // Variables de clase que son inyectadas por referencia
  matcher = new MyErrorStateMatcher();
  public formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
    private catalogService: CatalogService
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      email: [''],
      role: [null],
      active: [true],
      updated_at: [null],
      person: this.formBuilder.group({
        identification_type: ['', [Validators.required]],
        identification: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
            asyncValidators: [
              (control: any) =>
                checkIdentificationIsAvailable(
                  this.usuarioService,
                  this.currentUser.id
                )(control),
              udvEcIdentification(),
            ],
            updateOn: 'change',
          },
        ],
        names: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('[A-Za-z]{3,20} [A-Za-z]{3,20}'),
          ],
        ],
        last_names: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('[A-Za-z]{3,20} [A-Za-z]{3,20}'),
          ],
        ],
        gender: [''],
        date_birth: ['', ageValidator(3)],
        mobile_phone: [
          '',
          [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{3}[0-9]{7}$'),
          ],
        ],
        nationality: ['', [Validators.required]],
        address: ['', [Validators.minLength(10), Validators.maxLength(100)]],
        province: [
          {
            value: '',
            disabled: true,
          },
          [Validators.required],
        ],
        canton: [
          {
            value: '',
            disabled: true,
          },
          [Validators.required],
        ],
        parish: [
          {
            value: '',
            disabled: true,
          },
          [Validators.required],
        ],
      }),
    });
    this.formGroup.valueChanges.subscribe((value) => {
      this.currentUser = value;
      this.currentUser.person.date_birth =
        this.formGroup.get('person.date_birth')?.value;
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
                    this.usuarioService,
                    this.currentUser.id
                  )(control),
              ]);
            } else {
              identificationControl?.clearValidators();
              identificationControl?.clearAsyncValidators();
              identificationControl?.setAsyncValidators([
                (control: any) =>
                  checkIdentificationIsAvailable(
                    this.usuarioService,
                    this.currentUser.id
                  )(control),
              ]);
            }
            identificationControl?.updateValueAndValidity();
          });
      });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onSubmit() {
    if (this.currentUser.id) {
      if (this.formGroup.valid) {
        this.updateUsuario();
      }
    }
  }

  getCurrentUser() {
    this.loading = true;
    this.authService.getProfile().subscribe((res: any) => {
      if (res.status == 'success') {
        this.currentUser = res.data.user;
        this.formGroup.patchValue(this.currentUser);
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  updateUsuario() {
    this.loading = true;

    this.usuarioService
      .updateUsuario(this.currentUser)
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this.currentUser = res.data.user;
          this.formGroup.patchValue(this.currentUser);
        }
        this.loading = false;
      });
  }

  provinceSelected($event: any) {
    if ($event) {
      this.formGroup.get('person.canton')?.reset();
      this.formGroup.get('person.parish')?.reset();
    }
  }

  cantonSelected($event: any) {
    if ($event) {
      this.formGroup.get('person.parish')?.reset();
    }
  }
}
