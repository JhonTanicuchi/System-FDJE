import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';

@Component({
  selector: 'datos-sociales-form',
  templateUrl: './datos-sociales.form.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject(ControlContainer, { skipSelf: true, host: true }),
    },
  ],
})
export class DatosSocialesFormComponent {
  // Variables de clase que son inyectadas por referencia
  matcher = new MyErrorStateMatcher();
  @Input() loading: boolean;
  @Input() formGroup: FormGroup;

  isAdult(birthdate: Date): boolean {
    const fechaNacimiento = new Date(birthdate);
    const now = new Date();
    const ageInMilliseconds = now.getTime() - fechaNacimiento.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);

    return ageInYears >= 18;
  }
}
