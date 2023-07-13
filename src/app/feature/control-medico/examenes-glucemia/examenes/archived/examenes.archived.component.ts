import { Component, OnInit } from '@angular/core';
import { TestsService } from '../examen.service';
import { Test } from '../examen';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { DatePipe } from '@angular/common';
import { NamesSurnamesCompletePipe } from 'src/app/shared/pipes/names-surnames-complete.pipe';

@Component({
  selector: 'app-examenes-archived',
  templateUrl: './examenes.archived.component.html',
  styleUrls: ['./examenes.archived.component.css'],
  providers: [DatePipe, NamesSurnamesCompletePipe],
})
export class ExamenesArchivedComponent implements OnInit {
  tests_archived: Test[] = [];

  //loading
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    private testsService: TestsService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private NamesSurnamesCompletePipe: NamesSurnamesCompletePipe
  ) {}

  ngOnInit(): void {
    this.getTestsArchived();
  }

  getTestsArchived(): void {
    this.loading = true;
    this.testsService.getTestsArchived().subscribe((res: any) => {
      if (res.status === 'success') {
        this.tests_archived = res.data.tests;
      }
      this.loading = false;
    });
  }

  searchTestsArchivedByTerm(term: string): void {
    this.loading = true;
    this.testsService.searchTestsArchivedByTerm(term).subscribe((res: any) => {
      if (res.status === 'success') {
        this.tests_archived = res.data.tests;
      }
      this.loading = false;
    });
  }

  restoreTest(test: Test): void {
    this.testsService.restoreTest(test.id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.getTestsArchived();
      }
    });
  }

  openDialogArchiveTest(test: Test): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar este registro de examen de a?',
        message: 'El registro será eliminado y no podrá ser recuperado',
        dato: `${this.NamesSurnamesCompletePipe.transform(
          test.patient.person
        )}, Examen:  ${this.datePipe.transform(test.created_at, 'dd/MM/yyyy')}`,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTest(test);
      }
    });
  }
  public deleteTest(test: Test): void {
    this.testsService.deleteTest(test.id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.getTestsArchived();
      }
    });
  }
}
