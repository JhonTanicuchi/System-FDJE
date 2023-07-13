import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { DatePipe } from '@angular/common';
import { NamesSurnamesCompletePipe } from 'src/app/shared/pipes/names-surnames-complete.pipe';
import { HemoglobinTestsService } from '../hemoglobina.service';
import { HemoglobinTest } from '../hemoglobina';

@Component({
  selector: 'app-hemoglobina-archived',
  templateUrl: './hemoglobina.archived.component.html',
  styleUrls: ['./hemoglobina.archived.component.css'],
  providers: [DatePipe, NamesSurnamesCompletePipe],
})
export class HemoglobinaArchivedComponent implements OnInit {
  hemoglobin_tests_archived: HemoglobinTest[] = [];

  //loading
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    private hemoglobinTestsService: HemoglobinTestsService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private NamesSurnamesCompletePipe: NamesSurnamesCompletePipe
  ) {}

  ngOnInit(): void {
    this.getHemoglobinTestsArchived();
  }

  getHemoglobinTestsArchived(): void {
    this.loading = true;
    this.hemoglobinTestsService
      .getHemoglobinTestsArchived()
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hemoglobin_tests_archived = res.data.hemoglobin_tests;
        }
        this.loading = false;
      });
  }

  searchHemoglobinTestsArchivedByTerm(term: string): void {
    this.loading = true;
    this.hemoglobinTestsService
      .searchHemoglobinTestsArchivedByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hemoglobin_tests_archived = res.data.hemoglobin_tests;
        }
        this.loading = false;
      });
  }

  restoreHemoglobinTest(hemoglobin_test: HemoglobinTest): void {
    this.hemoglobinTestsService
      .restoreHemoglobinTest(hemoglobin_test.id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.getHemoglobinTestsArchived();
        }
      });
  }

  openDialogArchiveHemoglobinTest(hemoglobin_test: HemoglobinTest): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title:
          '¿Está seguro de eliminar este registro de examen de hemoglobina?',
        message: 'El registro será eliminado y no podrá ser recuperado',
        dato: `${this.NamesSurnamesCompletePipe.transform(
          hemoglobin_test.patient.person
        )}, Examen:  ${this.datePipe.transform(
          hemoglobin_test.created_at,
          'dd/MM/yyyy'
        )}`,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteHemoglobinTest(hemoglobin_test);
      }
    });
  }
  public deleteHemoglobinTest(hemoglobin_test: HemoglobinTest): void {
    this.hemoglobinTestsService
      .deleteHemoglobinTest(hemoglobin_test.id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.getHemoglobinTestsArchived();
        }
      });
  }
}
