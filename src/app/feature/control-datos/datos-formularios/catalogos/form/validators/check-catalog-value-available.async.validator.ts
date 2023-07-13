import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatalogService } from '../../catalogo.service'

export function checkCatalogValueIsAvailable(
  catalogService: CatalogService,
  type: string,
  catalog_id: number
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return catalogService
      .checkCatalogValueIsAvailable(type, control.value, catalog_id)
      .pipe(
        map((isAvailable) =>
          isAvailable ? null : { checkCatalogValueIsAvailable: true }
        )
      );
  };
}

