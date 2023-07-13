import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Catalog } from './catalogo';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalogo.component.html',
})
export class CatalogComponent implements OnDestroy {
  title: string; // Título de la página
  type: string; // Tipo de catálogo
  titleSubs: Subscription; // Suscripción al título de la página
  currentCatalog: Catalog = {} as Catalog; // Catálogo actual
  catalogs: Catalog[] = []; // Todos los catálogos

  // Inyecta los servicios de router y route para obtener argumentos de la ruta
  constructor(private router: Router) {
    this.titleSubs = this.getRouteArguments().subscribe(({ title, url }) => {
      this.title = title;
      this.type = url;
    });
  }

  public ngOnDestroy(): void {
    // Desuscribirse del título de la página al destruirse el componente
    this.titleSubs.unsubscribe();
  }

  // Obtener argumentos de la ruta actual
  public getRouteArguments() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  // Recibir catálogo actual desde el componente hijo
  public receiveCurrentCatalog($event: any) {
    this.currentCatalog = $event;
  }

  // Recibir todos los catálogos desde el componente hijo
  public receiveCatalogs($event: any) {
    this.catalogs = $event;
  }
}
