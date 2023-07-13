import { Component, OnInit } from '@angular/core';
import { Test } from '../examen';
import { TestsService } from '../examen.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';


@Component({
  selector: 'app-examenes-list',
  templateUrl: './examenes.list.component.html',
  styleUrls: ['./examenes.list.component.css'],
})
export class ExamenesListComponent implements OnInit {
  reverse = false;
  
  loading: boolean =  true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  tests: {
    test: Test;
    exams_missing: number;
  }[] = [];

  constructor(private testsService: TestsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTests();
  }

  getTests(): void {
    this.loading = true;
    this.testsService.getTests().subscribe((res: any) => {
      if (res.status === 'success') {
        //oredena por fecha de creación
        this.tests = res.data.tests;
        this.tests.sort((a, b) => {
          if (a.test.created_at < b.test.created_at) {
            return 1;
          }
          if (a.test.created_at > b.test.created_at) {
            return -1;
          }
          return 0;
        });
      }

      this.loading = false;
    });
  }

  searchTestsByTerm(term: string): void {
    this.loading = true;
    this.testsService.searchTestsByTerm(term).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.tests = res.data.tests;
      }

      if (term === '') {
        this.getTests();
      }

      this.loading = false;
    });
  }

  archiveTest(test: Test): void {
    this.testsService.archiveTest(test.id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.getTests();
      }
    });
  }

  openDialogArchiveTest(test: Test): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: '¿Está seguro de eliminar este examen?',
        message: 'El examen será eliminado y no podrá ser recuperado',

        dato: 'Examen del :' + test.created_at,
        button: 'Eliminar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.archiveTest(test);
      }
    });
  }

  reversOrder(): void {
    this.tests.reverse();
    this.reverse = !this.reverse;
  }
}
