import { Component, OnInit } from '@angular/core';

// importaciones de los servicios y modelos
import { Patient } from '../paciente';
import { PacienteService } from '../paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';

@Component({
  selector: 'app-pacientes-list-news',
  templateUrl: './pacientes.list.news.component.html',
  styleUrls: ['./pacientes.list.news.component.css'],
})
export class PacientesListNewsComponent implements OnInit {
  page: number;
  reverse = false;
  loading = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  newsPacientes: Patient[] = [];

  constructor(
    private pacientesService: PacienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacientesService.getPacientes().subscribe((res: any) => {
      if (res.status == 'success') {
        this.newsPacientes = res.data.patients.filter(
          (paciente: any) => paciente.type.value.toLowerCase() === 'nuevo'
        );

        //ordenar por nombres
        this.newsPacientes.sort((a, b) => {
          if (a.person.names.toLowerCase() > b.person.names.toLowerCase()) {
            return 1;
          }
          if (a.person.names.toLowerCase() < b.person.names.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }

      this.loading = false;
    });
  }

  archivePaciente(paciente: Patient): void {
    this.pacientesService.archivePaciente(paciente.id).subscribe((res: any) => {
      if (res.status == 'success') {
        this.getPacientes();
      }
    });
  }

  openDialogArchivePaciente(paciente: Patient): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar el usuario?',
        message: 'El usuario será eliminado y no podrá ser recuperado',
        dato: paciente.person.names + ' ' + paciente.person.last_names,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.archivePaciente(paciente);
      }
    });
  }

  reversOrder(): void {
    this.newsPacientes.reverse();
    this.reverse = !this.reverse;
  }
}
