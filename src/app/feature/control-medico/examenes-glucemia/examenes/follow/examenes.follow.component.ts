import { Component, OnInit } from '@angular/core';
import { Test } from '../examen';
import { TestsService } from '../examen.service';
import { Patient } from 'src/app/feature/pacientes/paciente';

@Component({
  selector: 'app-examenes-follow',
  templateUrl: './examenes.follow.component.html',
  styleUrls: ['./examenes.follow.component.css'],
})
export class ExamenesFollowComponent implements OnInit {
  reverse = false;
  
  loading:boolean = true;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  testsPatient: {
    patient: Patient;
    test: Test;
    exams_missing:number;
  }[] = [];

  months: number = 3;

  constructor(private testsService: TestsService) {}

  ngOnInit(): void {
    this.getTestsWithPatients();
  }

  createArray(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index + 1);
  }

  getTestsWithPatients(): void {
    this.loading = true;
    this.testsService.getTestsWithPatients().subscribe((res: any) => {
      if (res.status === 'success') {
        this.testsPatient = res.data.patients_with_tests;
        this.testsPatient.forEach((element: any) => {
          if (!element.test) {
            element.test = {} as Test;
          }
        });
      }
      this.loading = false;
    });
  }

  searchTestsWithPatientsByTerm(term: string): void {
    this.loading = true;
    this.testsService
      .searchTestsWithPatientsByTerm(term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.testsPatient = res.data.patients_with_tests;
          this.testsPatient.forEach((element: any) => {
            if (!element.test) {
              element.test = {} as Test;
            }
          });
        }

        if (term === '') {
          this.getTestsWithPatients();
        }

        this.loading = false;
      });
  }

  reversOrder(): void {
    this.testsPatient.reverse();
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
