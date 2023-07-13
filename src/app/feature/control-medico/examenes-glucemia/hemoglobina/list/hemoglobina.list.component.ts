import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/shared/material/modal-alert/modal-alert.component';
import { HemoglobinTest } from '../hemoglobina';
import { HemoglobinTestsService } from '../hemoglobina.service';

@Component({
  selector: 'app-hemoglobina-list',
  templateUrl: './hemoglobina.list.component.html',
  styleUrls: ['./hemoglobina.list.component.css'],
})
export class HemoglobinaListComponent implements OnInit {
  constructor(
    private hemoglobinTestsService: HemoglobinTestsService,
    private dialog: MatDialog
  ) {}

  page: number;
  reverse = false;
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  hemoglobin_tests: HemoglobinTest[] = [];

  ngOnInit(): void {
    this.getHemoglobinTests();
  }

  getHemoglobinTests(): void {
    this.loading = true;
    this.hemoglobinTestsService.getHemoglobinTests().subscribe((res: any) => {
      if (res.status === 'success') {
        this.hemoglobin_tests = res.data.hemoglobin_tests;
        this.hemoglobin_tests.sort((a, b) => {
          if (a.created_at < b.created_at) {
            return 1;
          }
          if (a.created_at > b.created_at) {
            return -1;
          }
          return 0;
        });
      }

      this.loading = false;
    });
  }

  searchHemoglobinTestsByTerm(term: string): void {
    this.loading = true;
    this.hemoglobinTestsService
      .searchHemoglobinTestsByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hemoglobin_tests = res.data.hemoglobin_tests;
        }
        if (term === '') {
          this.getHemoglobinTests();
        }

        this.loading = false;
      });
  }

  archiveHemoglobinTest(test: HemoglobinTest): void {
    this.hemoglobinTestsService
      .archiveHemoglobinTest(test.id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.getHemoglobinTests();
        }
      });
  }

  openDialogArchiveHemoglobinTest(test: HemoglobinTest): void {
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
        this.archiveHemoglobinTest(test);
      }
    });
  }

  reversOrder(): void {
    this.hemoglobin_tests.reverse();
    this.reverse = !this.reverse;
  }
}
