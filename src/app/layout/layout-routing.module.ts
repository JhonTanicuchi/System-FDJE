import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';

import { UsuariosListComponent } from '../feature/personal/usuarios/list/usuario.list.component';
import { UsuariosArchivedComponent } from '../feature/personal/usuarios/archived/usuario.archived.component';
import { UsuariosFormComponent } from '../feature/personal/usuarios/form/usuario.form.component';
import { RolesListComponent } from '../feature/personal/roles/list/rol.list.component';
import { RolesFormComponent } from '../feature/personal/roles/form/rol.form.component';
import { RolesArchivedComponent } from '../feature/personal/roles/archived/rol.archived.component';
import { ControlDatosComponent } from '../feature/control-datos/control-datos.component';
import { PacientesListComponent } from '../feature/pacientes/list/pacientes.list.component';
import { PacientesArchivedComponent } from '../feature/pacientes/archived/pacientes.archived.component';
import { ControlMedicoComponent } from '../feature/control-medico/control-medico.component';
import { SuppliesDeliveriesFormComponent } from '../feature/control-medico/entrega-insumos/form/entrega-insumo.form.component';
import { SuppliesDeliveriesFollowComponent } from '../feature/control-medico/entrega-insumos/follow/entrega-insumo.follow.component';
import { SuppliesDeliveriesListComponent } from '../feature/control-medico/entrega-insumos/list/entrega-insumo.list.component';
import { SuppliesDeliveriesSummaryComponent } from '../feature/control-medico/entrega-insumos/summary/entrega-insumo.summary.component';
import { ProfilePersonalDataComponent } from '../auth/profile/general/general.component';
import { ProfileMainComponent } from '../auth/profile/main/main.component';
import { PacientesFormComponent } from '../feature/pacientes/form/paciente.form.component';
import { HemoglobinaListComponent } from '../feature/control-medico/examenes-glucemia/hemoglobina/list/hemoglobina.list.component';
import { HemoglobinaFollowComponent } from '../feature/control-medico/examenes-glucemia/hemoglobina/follow/hemoglobina.follow.component';
import { HemoglobinaArchivedComponent } from '../feature/control-medico/examenes-glucemia/hemoglobina/archived/hemoglobina.archived.component';

import { HemoglobinaFormComponent } from '../feature/control-medico/examenes-glucemia/hemoglobina/form/hemoglobina.form.component';
import { ProfileSecurityComponent } from '../auth/profile/seguridad/seguridad.component';
import { SuppliesDeliveriesArchivedComponent } from '../feature/control-medico/entrega-insumos/archived/entrega-insumo.archived.component';
import { PacientesListNewsComponent } from '../feature/pacientes/news/pacientes.list.news.component';
import { ExamenesArchivedComponent } from '../feature/control-medico/examenes-glucemia/examenes/archived/examenes.archived.component';
import { ExamenesFollowComponent } from '../feature/control-medico/examenes-glucemia/examenes/follow/examenes.follow.component';
import { ExamenesFormComponent } from '../feature/control-medico/examenes-glucemia/examenes/form/examenes.form.component';
import { ExamenesListComponent } from '../feature/control-medico/examenes-glucemia/examenes/list/examenes.list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            component: ProfileMainComponent,
            children: [
              { path: '', redirectTo: 'datos-personales', pathMatch: 'full' },
              {
                path: 'datos-personales',
                component: ProfilePersonalDataComponent,
              },

              { path: 'seguridad', component: ProfileSecurityComponent },
            ],
          },
        ],
      },

      {
        path: 'personal',
        children: [
          { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
          {
            path: 'usuarios',
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
              },
              {
                path: 'form',
                component: UsuariosFormComponent,
              },
              {
                path: 'form/:id',
                component: UsuariosFormComponent,
              },
              {
                path: 'list',
                children: [
                  {
                    path: '',
                    component: UsuariosListComponent,
                  },
                  {
                    path: 'archived',
                    component: UsuariosArchivedComponent,
                  },
                ],
              },
            ],
          },
          {
            path: 'roles',
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
              },
              {
                path: 'form',
                component: RolesFormComponent,
              },
              {
                path: 'form/:id',
                component: RolesFormComponent,
              },
              {
                path: 'list',
                children: [
                  {
                    path: '',
                    component: RolesListComponent,
                  },
                  {
                    path: 'archived',
                    component: RolesArchivedComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'pacientes',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'form',
            component: PacientesFormComponent,
          },
          {
            path: 'form/:id',
            component: PacientesFormComponent,
          },
          {
            path: 'list',
            children: [
              { path: '', component: PacientesListComponent },
              { path: 'archived', component: PacientesArchivedComponent },
            ],
          },
          {
            path: 'news/list',
            component: PacientesListNewsComponent,
          },
        ],
      },
      {
        path: 'control-medico',
        children: [
          { path: '', component: ControlMedicoComponent },
          {
            path: 'examenes-glucemia',
            children: [
              {
                path: '',
                redirectTo: 'examenes_hemoglobina',
                pathMatch: 'full',
              },

              {
                path: 'examenes_hemoglobina',
                children: [
                  { path: '', redirectTo: 'follow', pathMatch: 'full' },
                  { path: 'follow', component: HemoglobinaFollowComponent },
                  {
                    path: 'form/paciente/:patient_id/hemoglobina',
                    component: HemoglobinaFormComponent,
                  },
                  {
                    path: 'form/paciente/:patient_id/examen/:test_id',
                    component: HemoglobinaFormComponent,
                  },
                  {
                    path: 'list',
                    children: [
                      { path: '', component: HemoglobinaListComponent },
                      {
                        path: 'archived',
                        component: HemoglobinaArchivedComponent,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'examenes',
                children: [
                  { path: '', redirectTo: 'follow', pathMatch: 'full' },
                  { path: 'follow', component: ExamenesFollowComponent },
                  {
                    path: 'form/paciente/:patient_id/hemoglobina',
                    component: ExamenesFormComponent,
                  },
                  {
                    path: 'form/paciente/:patient_id/examen/:test_id',
                    component: ExamenesFormComponent,
                  },
                  {
                    path: 'list',
                    children: [
                      { path: '', component: ExamenesListComponent },
                      {
                        path: 'archived',
                        component: ExamenesArchivedComponent,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: 'entrega-insumos',
            children: [
              { path: '', redirectTo: 'summary', pathMatch: 'full' },
              {
                path: 'summary',
                component: SuppliesDeliveriesSummaryComponent,
              },
              { path: 'follow', component: SuppliesDeliveriesFollowComponent },
              {
                path: 'form/paciente/:patient_id/entrega',
                component: SuppliesDeliveriesFormComponent,
              },
              {
                path: 'form/paciente/:patient_id/entrega/:delivery_id',
                component: SuppliesDeliveriesFormComponent,
              },
              {
                path: 'list',
                children: [
                  { path: '', component: SuppliesDeliveriesListComponent },
                  {
                    path: 'archived',
                    component: SuppliesDeliveriesArchivedComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'control-datos',
        children: [
          {
            path: '',
            component: ControlDatosComponent,
          },
          {
            path: 'datos-formularios',
            loadChildren: () =>
              import(
                '../feature/control-datos/datos-formularios/datos-formularios.module'
              ).then((m) => m.DFModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
