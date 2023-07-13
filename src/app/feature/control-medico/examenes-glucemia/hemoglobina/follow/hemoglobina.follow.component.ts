import { Patient } from 'src/app/feature/pacientes/paciente';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HemoglobinTest } from '../hemoglobina';
import { HemoglobinTestsService } from '../hemoglobina.service';

@Component({
  selector: 'app-hemoglobina-follow',
  templateUrl: './hemoglobina.follow.component.html',
  styleUrls: ['./hemoglobina.follow.component.css'],
})
export class HemoglobinaFollowComponent implements OnInit {
  page: number;
  reverse = false;
  loading: boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  hemoglobinTestsPatient: {
    patient: Patient;
    hemoglobin_test: HemoglobinTest;
  }[] = [];

  months: number = 3;

  constructor(
    private hemoglobinTestsService: HemoglobinTestsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHemoglobinTestsWithPatients();
  }

  createArray(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index + 1);
  }

  getHemoglobinTestsWithPatients(): void {
    this.loading = true;
    this.hemoglobinTestsService
      .getHemoglobinTestsWithPatients()
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hemoglobinTestsPatient = res.data.patients_with_hemoglobin_tests;
          this.hemoglobinTestsPatient.forEach((element: any) => {
            if (!element.hemoglobin_test) {
              element.hemoglobin_test = {} as HemoglobinTest;
            }
          });
        }
        this.loading = false;
      });
  }

  searchHemoglobinTestsWithPatientsByTerm(term: string): void {
    this.loading = true;
    this.hemoglobinTestsService
      .searchHemoglobinTestsWithPatientsByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.hemoglobinTestsPatient = res.data.patients_with_hemoglobin_tests;
          this.hemoglobinTestsPatient.forEach((element: any) => {
            if (!element.hemoglobin_test) {
              element.hemoglobin_test = {} as HemoglobinTest;
            }
          });
        }

        if (term === '') {
          this.getHemoglobinTestsWithPatients();
        }

        this.loading = false;
      });
  }

  reversOrder(): void {
    this.hemoglobinTestsPatient.reverse();
    this.reverse = !this.reverse;
  }

  hasPassed(created_at: Date): boolean {
    const now = new Date();
    const date = new Date(created_at);
    const diff = now.getTime() - date.getTime();
    const diffInMonths = diff / (1000 * 60 * 60 * 24 * 30);
    return diffInMonths >= this.months;
  }
}
