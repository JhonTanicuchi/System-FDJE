// Importaciones de Angular Core
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

// Importaciones de Reactive Forms
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

// Importaciones de Angular Material
import { MatDialog } from '@angular/material/dialog';

// Componentes personalizados
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { MyErrorStateMatcher } from 'src/app/shared/matcher/error-state-matcher';

// Validadores personalizados
import { checkCatalogValueIsAvailable } from './validators/check-catalog-value-available.async.validator';

// Modelos y clases relacionadas con la lógica de negocio de la aplicación
import { Catalog } from '../catalogo';
import { CatalogService } from '../catalogo.service';

/**
 * Componente que muestra el formulario de catálogos.
 */
@Component({
  selector: 'app-catalog-form',
  templateUrl: './catalogo.form.component.html',
})
export class CatalogFormComponent implements OnChanges {
  // Variables de instancia que son inyectadas
  @Input() type: string;
  @Input() currentCatalog: Catalog;
  loading: boolean = false;

  // Variables de clase que son inyectadas
  @Input() catalogs: Catalog[] = [];
  @Output() currentCatalogEvent = new EventEmitter<Catalog>();
  @Output() catalogsEvent = new EventEmitter<Catalog[]>();

  // Variables de clase que son inyectadas por referencia
  @ViewChild('form') form: NgForm;
  matcher = new MyErrorStateMatcher();

  // Variables de clase que son inyectadas por referencia
  public formGroup: FormGroup;

  /**
   * Constructor del componente.
   */
  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  /**
   * Inicializa el formulario de catálogos con los validadores y los valores por defecto.
   * Suscribe al formulario para detectar los cambios en los valores de los campos.
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      value: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
          ],
          asyncValidators: [
            (control: any) =>
              checkCatalogValueIsAvailable(
                this.catalogService,
                this.type,
                this.currentCatalog.id
              )(control),
          ],
          updateOn: 'change',
        },
      ],
    });
    this.formGroup.valueChanges.subscribe((val) => {
      this.currentCatalog.type = this.type;
      this.currentCatalog.value = val.value;
      this.currentCatalogEvent.emit(this.currentCatalog);
    });
  }

  /**
   * Envía el catálogo actual al componente padre.
   * Este evento es capturado por el componente padre para actualizar el catálogo actual.
   *
   * @param catalog Catálogo actual.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCatalog']) {
        this.loading = true;
      this.currentCatalog = changes['currentCatalog'].currentValue;
      this.formGroup.patchValue(this.currentCatalog);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }

  /**
   * Valida el formulario antes de enviarlo. Si el formulario es válido, determina si se trata de
   * un nuevo catálogo o una actualización existente y llama a la función correspondiente.
   */
  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.currentCatalog.id) {
        this.createCatalog();
      } else {
        this.updateCatalog();
      }
    }
  }

  /**
   * Crea un nuevo catálogo en el servidor.
   * Utiliza el servicio catalogService para realizar la petición al servidor.
   * En caso de éxito, agrega el nuevo catálogo al arreglo catalogs y notifica a otros componentes
   * mediante el evento sendCatalogs().
   * En caso de error, muestra una notificación con el mensaje de error.
   */
  createCatalog(): void {
    this.loading = true;
    this.catalogService
      .createCatalog(this.currentCatalog)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.catalogs.push(res.data.catalog);
          this.clearCatalog();
          this.sendCatalogs();
        }
        this.loading = false;
      });
  }

  /**
   * Actualiza un catálogo existente en el servidor.
   * Utiliza el servicio catalogService para realizar la petición al servidor.
   * En caso de éxito, actualiza el catálogo correspondiente en el arreglo catalogs
   * y notifica a otros componentes mediante el evento sendCatalogs().
   * En caso de error, muestra una notificación con el mensaje de error.
   */
  updateCatalog(): void {
    this.catalogService
      .updateCatalog(this.currentCatalog)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.catalogs = this.catalogs.map((catalog) =>
            catalog.id === res.data.catalog.id ? res.data.catalog : catalog
          );
          this.clearCatalog();
          this.sendCatalogs();
        }
      });
  }

  /**
   * Elimina un catálogo existente en el servidor mediante una ventana de confirmación y
   * utilizando el servicio catalogService.
   * En caso de éxito, elimina el catálogo correspondiente del arreglo catalogs
   * y notifica a otros componentes mediante el evento sendCatalogs().
   * En caso de error, muestra una notificación con el mensaje de error.
   * @param catalog : el catálogo a eliminar.
   */
  deleteCatalog(catalog: Catalog) {
    // Muestra una ventana de confirmación antes de eliminar
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar el catálogo?',
        message: 'El catálogo será eliminado y no podrá ser recuperado',
        dato: catalog.value,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.catalogService.deleteCatalog(catalog.id).subscribe((res: any) => {
          if (res.status === 'success') {
            this.catalogs = this.catalogs.filter((c) => c.id !== catalog.id);
            this.clearCatalog();
            this.sendCatalogs();
          }
        });
      }
    });
  }

  /**
   * Limpia el objeto currentCatalog actual y restablece el formulario, notificando a otros componentes mediante el evento sendCurrentCatalog().
   */
  clearCatalog(): void {
    this.currentCatalog = { id: 0, value: '', type: '' };
    this.form.resetForm();
    this.sendCurrentCatalog();
  }

  /**
   * Emite el objeto currentCatalog actual a través del evento currentCatalogEvent.
   */
  sendCurrentCatalog() {
    this.currentCatalogEvent.emit(this.currentCatalog);
  }

  /**
   * Emite el arreglo de catálogos actual a través del evento catalogsEvent.
   */
  sendCatalogs() {
    this.catalogsEvent.emit(this.catalogs);
  }
}
