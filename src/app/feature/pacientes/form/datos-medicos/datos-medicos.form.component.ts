import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';

@Component({
  selector: 'datos-medicos-form',
  templateUrl: './datos-medicos.form.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject(ControlContainer, { skipSelf: true, host: true }),
    },
  ],
})
export class DatosMedicosFormComponent {
  // Variables de clase que son inyectadas por referencia
  matcher = new MyErrorStateMatcher();
  @Input() loading: boolean;
  @Input() formGroup: FormGroup;
}
