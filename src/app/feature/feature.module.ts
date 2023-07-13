import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

/* import de rutas */
import { FeatureRoutingModule } from './feature-routing.module';

/* import de componentes shared */
import { ModuleHeaderComponent } from '../shared/header/module.header.component';
import { NoContentComponent } from '../shared/no-content/no-content.component';
import { SpinnerComponent } from '../shared/loader/spinner/spinner.component';
import { MaterialModule } from '../shared/material/material.module';
import { PaginationComponent } from '../shared/pagination/pagination.component';

/* import de componente perfil */
import { ProfileMainComponent } from '../auth/profile/main/main.component';
import { ProfileSidebarComponent } from '../auth/profile/sidebar/sidebar.component';
import { ProfileSecurityComponent } from '../auth/profile/seguridad/seguridad.component';
import { ProfilePersonalDataComponent } from '../auth/profile/general/general.component';
import { ProfileBreadcrumbsComponent } from '../auth/profile/breadcrumbs/breadcrumbs.component';

/* import de componentes de personal */
import { PersonalBreadcrumbsComponent } from './personal/header/breadcrumbs/personal.breadcrumbs.component';
import { PersonalTabsComponent } from './personal/header/tabs/personal.tabs.component';

/* import de componentes de usuarios */
import { UsuariosBreadcrumbsComponent } from './personal/usuarios/breadcrumbs/usuario.breadcrumbs.component';
import { UsuariosFormComponent } from './personal/usuarios/form/usuario.form.component';
import { UsuariosListComponent } from './personal/usuarios/list/usuario.list.component';
import { UsuariosArchivedComponent } from './personal/usuarios/archived/usuario.archived.component';

/* import de componentes de roles */
import { RolesBreadcrumbsComponent } from './personal/roles/breadcrumbs/rol.breadcrumbs.component';
import { RolesFormComponent } from './personal/roles/form/rol.form.component';
import { RolesListComponent } from './personal/roles/list/rol.list.component';
import { RolesArchivedComponent } from './personal/roles/archived/rol.archived.component';
import { RolesComboboxComponent } from './personal/roles/combobox/rol.combobox.component';

/* import de componentes de permisos */
import { PermisosListComponent } from './personal/roles/permisos/list/permiso.list.component';
import { PermisosListCheckboxComponent } from './personal/roles/permisos/list-checkbox/permiso.list.checkbox.component';

/* import de componentes de pacientes */
import { PacientesFormComponent } from './pacientes/form/paciente.form.component';
import { PacientesTabsComponent } from './pacientes/header/tabs/paciente.tabs.component';
import { PacientesBreadcrumbsComponent } from './pacientes/header/breadcrumbs/paciente.breadcrumbs.component';
import { PacientesFormTabsComponent } from './pacientes/form/tabs/paciente.form.tabs.component';
import { PacientesFormBreadcrumbsComponent } from './pacientes/form/breadcrumbs/paciente.form.breadcrumbs.component';
import { DatosPersonalesFormComponent } from './pacientes/form/datos-personales/datos-personales.form.component';
import { DatosMedicosFormComponent } from './pacientes/form/datos-medicos/datos-medicos.form.component';
import { DatosSocialesFormComponent } from './pacientes/form/datos-sociales/datos-sociales.form.component';
import { PacientesListComponent } from './pacientes/list/pacientes.list.component';
import { PacientesArchivedComponent } from './pacientes/archived/pacientes.archived.component';

/* import de componentes de control medico */
import { ControlMedicoBreadcrumbsComponent } from './control-medico/header/breadcrumbs/control-medico.breadcrumbs.component';
import { ControlMedicoComponent } from './control-medico/control-medico.component';
/* imports de componentes de entregas de insumos */
import { SuppliesDeliveriesSummaryComponent } from './control-medico/entrega-insumos/summary/entrega-insumo.summary.component';
import { SuppliesDeliveriesBreadcrumbsComponent } from './control-medico/entrega-insumos/header/breadcrumbs/entrega-insumo.breadcrumbs.component';
import { SuppliesDeliveriesTabsComponent } from './control-medico/entrega-insumos/header/tabs/entrega-insumo.tabs.component';
import { SuppliesDeliveriesFormComponent } from './control-medico/entrega-insumos/form/entrega-insumo.form.component';
import { SuppliesDeliveriesFollowComponent } from './control-medico/entrega-insumos/follow/entrega-insumo.follow.component';
import { SuppliesDeliveriesListComponent } from './control-medico/entrega-insumos/list/entrega-insumo.list.component';
import { SuppliesDeliveriesArchivedComponent } from './control-medico/entrega-insumos/archived/entrega-insumo.archived.component';
/* imports de componentes de exámenes de hemoglobina */

import { HemoglobinaFormComponent } from './control-medico/examenes-glucemia/hemoglobina/form/hemoglobina.form.component';
import { HemoglobinaListComponent } from './control-medico/examenes-glucemia/hemoglobina/list/hemoglobina.list.component';
import { HemoglobinaArchivedComponent } from './control-medico/examenes-glucemia/hemoglobina/archived/hemoglobina.archived.component';

/* import de componentes de control de datos */
import { ControlDatosComponent } from './control-datos/control-datos.component';
import { ControlDatosHeaderComponent } from './control-datos/header/control-datos.header.component';
import { ControlDatosBreadcrumbsComponent } from './control-datos/header/breadcrumbs/control-datos.breadcrumbs.component';

/* import de componentes de control de datos - catalogos */
import { PatientTypesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-paciente/tipos-paciente.combobox.component';
import { EstadosExamenComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/estados-examen/estados-examen.combobox.component';
import { TiposDiabetesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-diabetes/tipos-diabetes.combobox.component';
import { TiposHospitalComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-hospital/tipos-hospital.combobox.component';
import { TiposInformacionAyudaComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-informacion-ayuda/tipos-informacion-ayuda.combobox.component';
import { TiposInsulinaBasalComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-insulina-basal/tipos-insulina-basal.combobox.component';
import { TiposInsulinaPrandialComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-insulina-prandial/tipos-insulina-prandial.combobox.component';
import { NationalityTypesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-nacionalidad/tipos-nacionalidad.combobox.component';
import { IdentificationTypesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-identificacion/tipos-identificacion.combobox.component';
import { TiemposDiagnosticoComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tiempos-diagnostico/tiempos-diagnostico.combobox.component';
import { GendersComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/generos/generos.combobox.component';
import { ProvincesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/división-territorial/provincias/provincias.combobox.component';
import { CantonsComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/división-territorial/cantones/cantones.combobox.component';
import { MedicosComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/medicos/medicos.combobox.component';
import { ParishesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/división-territorial/parroquias/parroquias.combobox.component';
import { TiposJefesHogarComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-jefes-hogar/tipos-jefes-hogar.combobox.component';
import { TiposZonaComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-zona/tipos-zona.combobox.component';
import { TiposViviendaComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-vivienda/tipos-vivienda.combobox.component';
import { TiposProblemaComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-problema/tipos-problema.combobox.component';
import { FormularioComponent } from './public-forms/formulario/formulario.component';
import { HospitalesComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/hospitales/hospitales.combobox.component';
import { FullNameFirstMiddlePipe } from '../shared/pipes/full-name-first-middle.pipe';
import { FullNameShortPipe } from '../shared/pipes/full-name-short.pipe';
import { NameInitialsPipe } from '../shared/pipes/name-initials.pipe';
import { NamesSurnamesCompletePipe } from '../shared/pipes/names-surnames-complete.pipe';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { TiposParentescoComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/tipos-parentesco/tipos-parentesco.combobox.component';
import { HemoglobinaFollowComponent } from './control-medico/examenes-glucemia/hemoglobina/follow/hemoglobina.follow.component';
import { ExamenesGlucemiaTabsComponent } from './control-medico/examenes-glucemia/breadcrumbs/tabs/examen-glucemia.tabs.component';
import { ExamenesGlucemiaBreadcrumbsComponent } from './control-medico/examenes-glucemia/breadcrumbs/examen-glucemia.breadcrumbs.component';
import { ExamenesFormComponent } from './control-medico/examenes-glucemia/examenes/form/examenes.form.component';
import { ExamenesArchivedComponent } from './control-medico/examenes-glucemia/examenes/archived/examenes.archived.component';
import { ExamenesFollowComponent } from './control-medico/examenes-glucemia/examenes/follow/examenes.follow.component';
import { ExamenesListComponent } from './control-medico/examenes-glucemia/examenes/list/examenes.list.component';
import { RegionsComboboxComponent } from './control-datos/datos-formularios/catalogos/comboboxes/regiones/regiones.combobox.component';
import { HasPermissionsDirective } from '../auth/has-permission.directive';
import { PacientesListNewsComponent } from './pacientes/news/pacientes.list.news.component';

@NgModule({
  declarations: [
    AgePipe,
    TimeAgoPipe,
    CapitalizePipe,
    NameInitialsPipe,
    FullNameShortPipe,
    FullNameFirstMiddlePipe,
    NamesSurnamesCompletePipe,

    HasPermissionsDirective,
    ModuleHeaderComponent,
    SpinnerComponent,
    NoContentComponent,

    ProfileMainComponent,
    ProfileSidebarComponent,
    ProfileBreadcrumbsComponent,
    ProfileSecurityComponent,
    ProfilePersonalDataComponent,

    PersonalBreadcrumbsComponent,
    PersonalTabsComponent,
    UsuariosBreadcrumbsComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    UsuariosArchivedComponent,
    RolesBreadcrumbsComponent,
    RolesFormComponent,
    RolesListComponent,
    RolesArchivedComponent,
    RolesComboboxComponent,
    PermisosListComponent,
    PermisosListCheckboxComponent,

    PacientesListNewsComponent,
    PacientesTabsComponent,
    PacientesBreadcrumbsComponent,
    FormularioComponent,
    DatosPersonalesFormComponent,
    DatosMedicosFormComponent,
    DatosSocialesFormComponent,
    PacientesFormComponent,
    PacientesListComponent,
    PacientesArchivedComponent,
    PacientesFormBreadcrumbsComponent,
    PacientesFormTabsComponent,

    ControlMedicoComponent,
    ControlMedicoBreadcrumbsComponent,
    SuppliesDeliveriesBreadcrumbsComponent,
    SuppliesDeliveriesTabsComponent,
    SuppliesDeliveriesSummaryComponent,
    SuppliesDeliveriesFormComponent,
    SuppliesDeliveriesFollowComponent,
    SuppliesDeliveriesListComponent,
    SuppliesDeliveriesArchivedComponent,
    ExamenesGlucemiaTabsComponent,
    ExamenesGlucemiaBreadcrumbsComponent,
    HemoglobinaFormComponent,
    HemoglobinaArchivedComponent,
    HemoglobinaListComponent,
    HemoglobinaFollowComponent,
    ExamenesFormComponent,
    ExamenesListComponent,
    ExamenesArchivedComponent,
    ExamenesFollowComponent,
    ExamenesArchivedComponent,

    ControlDatosHeaderComponent,
    ControlDatosComponent,
    ControlDatosBreadcrumbsComponent,
    EstadosExamenComboboxComponent,
    TiposDiabetesComboboxComponent,
    TiposHospitalComboboxComponent,
    TiposInformacionAyudaComboboxComponent,
    TiposInsulinaBasalComboboxComponent,
    TiposInsulinaPrandialComboboxComponent,
    PatientTypesComboboxComponent,
    NationalityTypesComboboxComponent,
    IdentificationTypesComboboxComponent,
    TiemposDiagnosticoComboboxComponent,
    TiposJefesHogarComboboxComponent,
    TiposZonaComboboxComponent,
    TiposParentescoComboboxComponent,
    TiposViviendaComboboxComponent,
    TiposProblemaComboboxComponent,
    MedicosComboboxComponent,
    HospitalesComboboxComponent,
    GendersComboboxComponent,
    ProvincesComboboxComponent,
    CantonsComboboxComponent,
    ParishesComboboxComponent,
    RegionsComboboxComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
  ],

  exports: [
    AgePipe,
    TimeAgoPipe,
    CapitalizePipe,
    SpinnerComponent,
    NameInitialsPipe,
    FullNameShortPipe,
    NoContentComponent,
    NgxPaginationModule,
    PaginationComponent,
    FullNameFirstMiddlePipe,
    HasPermissionsDirective,
    ControlDatosBreadcrumbsComponent,
  ],
})
export class FeatureModule {}
