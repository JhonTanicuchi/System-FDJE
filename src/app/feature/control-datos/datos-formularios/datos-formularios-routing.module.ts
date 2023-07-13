import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DFMainComponent } from './main/main.component';
import { CatalogComponent } from './catalogos/catalogo.component';

const routes: Routes = [
  {
    path: '',
    component: DFMainComponent,
    children: [
      { path: '', redirectTo: 'estados-examen', pathMatch: 'full' },
      {
        path: 'estados-examen',
        component: CatalogComponent,
        data: {
          title: 'Estados de examen',
          url: 'estados-examen',
        },
      },
      {
        path: 'hospitales',
        component: CatalogComponent,
        data: {
          title: 'Hospitales',
          url: 'hospitales',
        },
      },
      {
        path: 'insumos',
        component: CatalogComponent,
        data: {
          title: 'Insumos',
          url: 'insumos',
        },
      },
      {
        path: 'medicos',
        component: CatalogComponent,
        data: {
          title: 'Médicos',
          url: 'medicos',
        },
      },
      {
        path: 'regiones',
        component: CatalogComponent,
        data: {
          title: 'Regiones',
          url: 'regiones',
        },
      },
      {
        path: 'tiempo-diagnostico',
        component: CatalogComponent,
        data: {
          title: 'Tiempo de diagnóstico',
          url: 'tiempo-diagnostico',
        },
      },
      {
        path: 'tipos-diabetes',
        component: CatalogComponent,
        data: {
          title: 'Tipos de diabetes',
          url: 'tipos-diabetes',
        },
      },
      {
        path: 'tipos-hospital',
        component: CatalogComponent,
        data: {
          title: 'Tipos hospital',
          url: 'tipos-hospital',
        },
      },
      {
        path: 'tipos-identificacion',
        component: CatalogComponent,
        data: { title: 'Tipos de identificación', url: 'tipos-identificacion' },
      },
      {
        path: 'tipos-informacion-ayuda',
        component: CatalogComponent,
        data: {
          title: 'Tipos de informacion de ayuda',
          url: 'tipos-informacion-ayuda',
        },
      },
      {
        path: 'tipos-insulina-basal',
        component: CatalogComponent,
        data: {
          title: 'Tipos de insulina basal',
          url: 'tipos-insulina-basal',
        },
      },
      {
        path: 'tipos-insulina-prandial',
        component: CatalogComponent,
        data: {
          title: 'Tipos de insulina prandial',
          url: 'tipos-insulina-prandial',
        },
      },
      {
        path: 'tipos-nacionalidad',
        component: CatalogComponent,
        data: { title: 'Tipos de nacionalidad', url: 'tipos-nacionalidad' },
      },
      {
        path: 'tipos-paciente',
        component: CatalogComponent,
        data: { title: 'Tipos de paciente', url: 'tipos-paciente' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DFRoutingModule {}
