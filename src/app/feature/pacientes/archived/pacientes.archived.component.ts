import { Component, OnInit } from '@angular/core';
import { Patient } from '../paciente';
import { PacienteService } from '../paciente.service';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pacientes-archived',
  templateUrl: './pacientes.archived.component.html',
  styleUrls: ['./pacientes.archived.component.css'],
})
export class PacientesArchivedComponent implements OnInit {
  pacientesArchived: Patient[] = [];

  //loading
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPacientesArchived();
  }

  getPacientesArchived(): void {
    this.loading = true;
    this.pacienteService.getPacientesArchived().subscribe((res: any) => {
      if (res.status === 'success') {
        this.pacientesArchived = res.data.patients;
      }
      this.loading = false;
    });
  }

  searchPacientesArchivedByTerm(term: string): void {
    this.loading = true;
    this.pacienteService
      .searchPacientesArchivedByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.pacientesArchived = res.data.patients;
        }
        this.loading = false;
      });
  }

  restorePaciente(paciente: Patient): void {
    this.pacienteService.restorePaciente(paciente.id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.getPacientesArchived();
      }
    });
  }

  openDialogDeletePaciente(paciente: Patient): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '350px',
      width: '700px',
      data: {
        title: '¿Está seguro de eliminar definitivamente el usuario?',
        message:
          'El usuario será eliminado definitivamente de la base de datos y no podrá ser recuperado nunca más.',
        dato: paciente.person.names + ' ' + paciente.person.last_names,
        button: 'Eliminar definitivamente',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePaciente(paciente);
      }
    });
  }

  deletePaciente(paciente: Patient): void {
    this.pacienteService.deletePaciente(paciente.id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.getPacientesArchived();
      }
    });
  }
}
