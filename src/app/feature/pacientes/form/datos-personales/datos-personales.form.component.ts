import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/feature/control-datos/datos-formularios/catalogos/catalogo.service';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';

@Component({
  selector: 'datos-personales-form',
  templateUrl: './datos-personales.form.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject(ControlContainer, { skipSelf: true, host: true }),
    },
  ],
})
export class DatosPersonalesFormComponent implements OnInit {
  // Variables de clase que son inyectadas por referencia
  matcher = new MyErrorStateMatcher();

  cantones: [];
  parroquias: [];

  @Input() formGroup: FormGroup;
  @Input() loading: boolean;

  publicForm = false;

  constructor(private router: Router, private catalogService: CatalogService) {}

  ngOnInit(): void {
    if (this.router.url == '/registro/formulario') {
      this.publicForm = true;
      this.catalogService
        .getCatalogItemByTypeAndValue('tipos-paciente', 'nuevo')
        .subscribe((res: any) => {
          if (res.status === 'success') {
            if (res.data.catalog) {
              this.formGroup.get('type')?.setValue(res.data.catalog.id);
            }
          }
        });

      this.formGroup.get('person.region')?.disable();
    }
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
