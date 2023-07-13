// Importaciones de Angular
import { Component, OnInit } from '@angular/core';

// Importaciones de servicios personalizados
import { AuthService } from 'src/app/auth/auth.service';

// Importaciones de servicios de la API
import { UsuarioService } from 'src/app/feature/personal/usuarios/usuario.service';
import { PacienteService } from 'src/app/feature/pacientes/paciente.service';
import { SuppliesDeliveriesService } from 'src/app/feature/control-medico/entrega-insumos/entrega-insumo.service';

// Importaciones de interfaces
import { Statistics } from './dashboard.interface';
import { User } from 'src/app/auth/models/user.interface';

/**
 * Componente que maneja la lógica y la vista del dashboard.
 */
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // Variables de instancia de clase
  user: User;
  statistics: Statistics = {
    totalUsers: 0,
    inactiveUsers: 0,
    totalPatients: 0,
    newPatients: 0,
    sponsoredPatients: 0,
    pendingSupplyDeliveries: 0,
    completedSupplyDeliveries: 0,
  };

  loading: boolean = true;

  /**
   * Inyecta los servicios necesarios para el funcionamiento del componente.
   * @param authService Servicio de autenticación.
   * @param userService Servicio de usuarios.
   * @param patientService Servicio de pacientes.
   * @param supplyDeliveriesService Servicio de entregas de insumos.
   * @param loaderService Servicio de carga.
   */
  constructor(
    public authService: AuthService,
    private userService: UsuarioService,
    private patientService: PacienteService,
    private suppliesDeliveriesService: SuppliesDeliveriesService
  ) {}

  /**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.getCurrentUser();
    this.getTotalUsers();
    this.getTotalPatients();
    this.getSuppliesDeliveries();
  }

  /*
   * Este método se encarga de obtener el usuario actualmente logueado utilizando el servicio de autenticación.
   * Utiliza el método getUser() del servicio de autenticación y se suscribe al mismo para obtener el usuario y asignarlo a la variable "user" de la clase.
   */
  getCurrentUser() {
    this.authService.getUser().subscribe((user: User) => (this.user = user));
  }

  /*
   * Este método se encarga de obtener el total de usuarios y los usuarios inactivos utilizando el servicio de usuarios.
   * Primero verifica si el usuario actual tiene permisos para "LEER_USUARIOS" mediante el método isAuthorized del servicio de autenticación.
   * Si tiene permisos, se suscribe al método getUsuarios() del servicio de usuarios para obtener la respuesta.
   * Si la respuesta es exitosa, se asigna el total de usuarios a la variable "totalUsers" del objeto "statistics" y se filtran los usuarios inactivos y se asigna el total a la variable "inactiveUsers".
   */
  getTotalUsers() {
    if (this.authService.isAuthorized(['LEER_USUARIOS'])) {
      this.loading = true;
      this.userService.getUsuarios().subscribe((res: any) => {
        if (res.status == 'success') {
          this.statistics.totalUsers = res.data.users.length;
          this.statistics.inactiveUsers = res.data.users.filter(
            (x: any) => !x.active
          ).length;
        }
        this.loading = false;
      });
    }
  }

  /*
   * Este método se encarga de obtener el total de pacientes, pacientes nuevos y pacientes apadrinados utilizando el servicio de pacientes.
   * Primero verifica si el usuario actual tiene permisos para "LEER_PACIENTES" mediante el método isAuthorized del servicio de autenticación.
   * Si tiene permisos, se suscribe al método getPacientes() del servicio de pacientes para obtener la respuesta.
   * Si la respuesta es exitosa, se asigna el total de pacientes a la variable "totalPatients" del objeto "statistics", se filtran los pacientes nuevos y se asigna el total a la variable "newPatients" y se filtran los pacientes apadrinados y se asigna el total a la variable "sponsoredPatients".
   */
  getTotalPatients() {
    if (this.authService.isAuthorized(['LEER_PACIENTES'])) {
      this.loading = true;
      this.patientService.getPacientes().subscribe((res: any) => {
        if (res.status == 'success') {
          this.statistics.totalPatients = res.data.patients.length;
          this.statistics.newPatients = res.data.patients.filter(
            (x: any) => x.type.value.toLowerCase() == 'nuevo'
          ).length;
          this.statistics.sponsoredPatients = res.data.patients.filter(
            (x: any) => x.type.value.toLowerCase() == 'apadrinado'
          ).length;
        }
        this.loading = false;
      });
    }
  }

  /*
   * Este método se encarga de obtener el total de entregas de insumos utilizando los servicios de pacientes y entregas de insumos.
   * Primero verifica si el usuario actual tiene permisos para "LEER_ENTREGAS_INSUMOS" mediante el método isAuthorized del servicio de autenticación.
   * Si tiene permisos, se suscribe al método getPacientes() del servicio de pacientes para obtener la respuesta de los pacientes.
   * Luego se suscribe al método getEntregasInsumos() del servicio de entregas de insumos para obtener la respuesta de las entregas.
   * Si ambas respuestas son exitosas, se crea un arreglo vacío "pendingPatients" para guardar los pacientes con entregas pendientes.
   * Se filtran los pacientes apadrinados y se recorre cada paciente buscando en las entregas de insumos si existe una entrega asociada al paciente.
   * Si no existe entrega asociada, se agrega el paciente al arreglo "pendingPatients".
   * Finalmente, se asigna el total de pacientes en "pendingPatients" a la variable "pendingSupplyDeliveries" del objeto "statistics".
   */
  getSuppliesDeliveries() {
    if (
      this.authService.isAuthorized(['LEER_PACIENTES']) &&
      this.authService.isAuthorized(['LEER_ENTREGAS_INSUMOS'])
    ) {
      this.loading = true;
      this.suppliesDeliveriesService
        .getSuppliesDeliveriesWithPatients()
        .subscribe((res: any) => {
          if (res.status === 'success') {
            const suppliesDeliveries = res.data.patients_with_supplies_delivery;
            const pendingSuppliesDeliveries = suppliesDeliveries.filter(
              (x: any) => x.supplies_delivery === null
            ).length;
            this.statistics.pendingSupplyDeliveries = pendingSuppliesDeliveries;

            const completedSuppliesDeliveries = suppliesDeliveries.filter(
              (x: any) => x.supplies_delivery !== true
            ).length;
            this.statistics.completedSupplyDeliveries =
              completedSuppliesDeliveries;
          }
          this.loading = false;
        });
    }
  }
}
