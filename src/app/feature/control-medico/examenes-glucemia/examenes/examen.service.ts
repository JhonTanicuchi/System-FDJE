import { Injectable } from '@angular/core';
import { Test } from './examen';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TestsService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = environment.API_URL + '/tests';

  // GET
  public getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.url);
  }

  // GET tests/:id
  public getTest(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.url}/${id}`);
  }

  //Examenes por pacientes
  getTestsWithPatients(): Observable<any> {
    return this.http.get<any[]>(`${this.url}/patients/list`);
  }

  // POST /tests/create
  public createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.url}/create`, test, this.httpOptions);
  }

  // PUT /tests/update/:id
  public updateTest(id: number, test: Test): Observable<Test> {
    return this.http.put<Test>(
      `${this.url}/update/${id}`,
      test,
      this.httpOptions
    );
  }

  // GET /tests/archived/list
  public getTestsArchived(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/archived/list`);
  }

  // PUT /tests/archive/:id
  public archiveTest(id: number): Observable<Test> {
    return this.http.put<Test>(`${this.url}/archive/${id}`, this.httpOptions);
  }

  // PUT /tests/restore/:id
  public restoreTest(id: number): Observable<Test> {
    return this.http.put<Test>(`${this.url}/restore/${id}`, this.httpOptions);
  }
  // GET /tests/search/term/:term

  // DELETE /tests/delete/:id
  public deleteTest(id: number): Observable<Test> {
    return this.http.delete<Test>(`${this.url}/delete/${id}`);
  }

  // GET /tests/search/term/:term
  public searchTestsByTerm(term: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/search/term/${term}`);
  }

  // GET /tests/patients/search/term/:term
  public searchTestsWithPatientsByTerm(term: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/patients/search/term/${term}`);
  }

  // GET /tests/archived/search/term/:term
  public searchTestsArchivedByTerm(term: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/archived/search/term/${term}`);
  }

  // GET /tests/patient/{id}/hemoglobin_test_last
  public getTestLast(patient_id: number): Observable<Date> {
    return this.http.get<Date>(`${this.url}/patient/${patient_id}/test_last`);
  }
}
