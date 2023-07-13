// Importaciones de Angular Core
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

// Importaciones de Angular Material
import { MatDialog } from '@angular/material/dialog';

// Componentes personalizados
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';

// Modelos y clases relacionadas con la lógica de negocio de la aplicación
import { Catalog } from '../catalogo';
import { CatalogService } from '../catalogo.service';

/**
 * Componente que muestra la lista de catálogos.
 */
@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalogo.list.component.html',
  styleUrls: ['./catalogo.list.component.css'],
})
export class CatalogListComponent implements OnInit, OnChanges {
  // Variables de control de la visualización
  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };
  reverse = false;
  totalCatalogs = 0;
  loading: boolean = true;

  // Variables de instancia que son inyectadas
  @Input() type: string;
  @Input() currentCatalog: Catalog;

  // Variables de clase que son inyectadas
  @Input() catalogs: Catalog[] = [];

  // Variables de clase que son inyectadas por referencia
  @Output() currentCatalogEvent = new EventEmitter<Catalog>();
  @Output() catalogsEvent = new EventEmitter<Catalog[]>();

  /**
   * Constructor del componente.
   */
  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog,
  ) {}

  /**
   * Este método es llamado cada vez que se producen cambios en el objeto 'catalogs' y se encarga de actualizar el total de catálogos existentes en la aplicación. Utiliza el servicio catalogService para obtener el número total de catálogos existentes y asignarlo a la variable totalCatalogos.
   * @param changes: SimpleChanges objeto que contiene los cambios en el objeto 'catalogs'
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCatalog'] || changes['catalogs']) {
      this.getTotalsCatalogos();
    }
  }

  /**
   * Este método es llamado automáticamente al iniciar el componente.
   * Utiliza el servicio catalogService para obtener todos los catálogos del tipo especificado en 'this.type' y los asigna al arreglo 'this.catalogs'
   */
  ngOnInit(): void {
    this.getCatalogsByType(this.type);
  }

  /**
   * Este método se encarga de obtener los totales de catálogos existentes en el servidor a través del servicio catalogService.
   * Al obtener los catálogos, se asigna el valor de la longitud de estos a la variable totalCatalogos.
   */
  getTotalsCatalogos(): void {
    this.loading = true;
    this.catalogService.getCatalogs().subscribe((res: any) => {
      if (res.status === 'success') {
        this.totalCatalogs = res.data.catalogs.length;
      }
      this.loading = false;
    });
  }

  /**
   * Este método se encarga de obtener todos los catálogos de un determinado tipo específico a través del servicio catalogService.
   * Se utiliza el parámetro "type" para especificar qué tipo de catálogo se desea obtener.
   * Una vez obtenidos los catálogos, se asignan al arreglo "catalogs".
   * Además, se notifica a otros componentes mediante el evento "sendCatalogos()".
   *@param type : el tipo de catálogo a obtener.
   */
  getCatalogsByType(type: string): void {
    this.loading = true;
    this.catalogService.getCatalogsByType(type).subscribe((res: any) => {
      if (res.status === 'success') {
        this.catalogs = res.data.catalogs;
        this.sendCatalogs();
      }
      this.loading = false;
    });
  }

  /**
   * Este método busca un catálogo en particular a través de un término específico, utilizando el servicio catalogService.
   * Utiliza el parámetro type para especificar el tipo de catálogo a buscar y el parámetro term para especificar el término a buscar.
   * En caso de éxito, actualiza el arreglo catalogs con los resultados de la búsqueda.
   * Si el término es una cadena vacía, llama al método getCatalogsByType() para obtener todos los catálogos del tipo especificado.
   *@param type : el tipo de catálogo a buscar.
   *@param term : el término a buscar en el catálogo.
   */
  searchCatalogosByTerm(type: string, term: string): void {
    this.loading = true;
    this.catalogService
      .searchCatalogsByTerm(type, term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.catalogs = res.data.catalogs;
        }
        if (term === '') {
          this.getCatalogsByType(this.type);
        }
        this.reverse = false;
        this.loading = false;
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
  deleteCatalogo(catalog: Catalog): void {
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
            this.getCatalogsByType(this.type);
          }
        });
      }
    });
  }

  /**
   * Esta función edita el catálogo actual y lo envía.
   * @param {Catalog} catalog El catálogo a editar.
   */
  editCatalog(catalog: Catalog): void {
    this.currentCatalog = catalog;
    this.sendCurrentCatalog();
  }
  /**
   * Envía el catalogo actual a través de un evento.
   * @emits currentCatalogEvent - Evento que contiene el catalogo actual.
   */
  sendCurrentCatalog(): void {
    this.currentCatalogEvent.emit(this.currentCatalog);
  }

  /**
   * Envía los catalogos almacenados en la propiedad catalogs.
   * @emits catalogsEvent Emite los catalogos almacenados en la propiedad catalogs.
   */
  sendCatalogs(): void {
    this.catalogsEvent.emit(this.catalogs);
  }

  /**
   * Esta función invierte el orden de los elementos del array "catalogs" y cambia el estado de la variable "reverse".
   */
  reverseOrder(): void {
    this.catalogs.reverse();
    this.reverse = !this.reverse;
  }
}
