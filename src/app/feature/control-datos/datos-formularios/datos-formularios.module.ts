// Módulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Módulos de la aplicación
import { DFRoutingModule } from './datos-formularios-routing.module';
import { FeatureModule } from '../../feature.module';
import { MaterialModule } from '../../../shared/material/material.module';

// Componentes del módulo Datos Formularios
import { DFMainComponent } from './main/main.component';
import { DFSidebarComponent } from './sidebar/sidebar.component';
import { CatalogComponent } from './catalogos/catalogo.component';
import { CatalogListComponent } from './catalogos/list/catalogo.list.component';
import { CatalogFormComponent } from './catalogos/form/catalogo.form.component';

@NgModule({
  declarations: [
    DFMainComponent,
    DFSidebarComponent,
    CatalogComponent,
    CatalogFormComponent,
    CatalogListComponent,
  ],
  imports: [
    CommonModule,
    FeatureModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DFRoutingModule,
    MaterialModule,
  ],
})
export class DFModule {}
