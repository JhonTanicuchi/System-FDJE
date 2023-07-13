import { Injectable } from '@angular/core';
import { HemoglobinTest } from './hemoglobina';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HemoglobinTestsService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = environment.API_URL + '/hemoglobin-tests';

  // GET
  public getHemoglobinTests(): Observable<HemoglobinTest[]> {
    return this.http.get<HemoglobinTest[]>(this.url);
  }

  // GET /glycemic-tests/:id
  public getHemoglobinTest(id: number): Observable<HemoglobinTest> {
    return this.http.get<HemoglobinTest>(`${this.url}/${id}`);
  }

  //HEMOGLOBINA Y PACIENTES
  getHemoglobinTestsWithPatients(): Observable<any> {
    return this.http.get<any[]>(`${this.url}/patients/list`);
  }
  // POST /glycemic-tests/create
  public createHemoglobinTest(
    test: HemoglobinTest
  ): Observable<HemoglobinTest> {
    return this.http.post<HemoglobinTest>(
      `${this.url}/create`,
      test,
      this.httpOptions
    );
  }

  // PUT /glycemic-tests/update/:id
  public updateHemoglobinTest(
    id: number,
    test: HemoglobinTest
  ): Observable<HemoglobinTest> {
    return this.http.put<HemoglobinTest>(
      `${this.url}/update/${id}`,
      test,
      this.httpOptions
    );
  }

  // GET /glycemic-tests/archived/list
  public getHemoglobinTestsArchived(): Observable<HemoglobinTest[]> {
    return this.http.get<HemoglobinTest[]>(`${this.url}/archived/list`);
  }

  // PUT /glycemic-tests/archive/:id
  public archiveHemoglobinTest(id: number): Observable<HemoglobinTest> {
    return this.http.put<HemoglobinTest>(
      `${this.url}/archive/${id}`,
      this.httpOptions
    );
  }

  // PUT /glycemic-tests/restore/:id
  public restoreHemoglobinTest(id: number): Observable<HemoglobinTest> {
    return this.http.put<HemoglobinTest>(
      `${this.url}/restore/${id}`,
      this.httpOptions
    );
  }

  // DELETE /glycemic-tests/delete/:id
  public deleteHemoglobinTest(id: number): Observable<HemoglobinTest> {
    return this.http.delete<HemoglobinTest>(`${this.url}/delete/${id}`);
  }

  // GET /glycemic-tests/search/term/:term
  public searchHemoglobinTestsByTerm(
    term: string
  ): Observable<HemoglobinTest[]> {
    return this.http.get<HemoglobinTest[]>(`${this.url}/search/term/${term}`);
  }

  // GET /glycemic-tests/patients/search/term/:term
  public searchHemoglobinTestsWithPatientsByTerm(
    term: string
  ): Observable<HemoglobinTest[]> {
    return this.http.get<HemoglobinTest[]>(
      `${this.url}/patients/search/term/${term}`
    );
  }

  // GET /glycemic-tests/archived/search/term/:term
  public searchHemoglobinTestsArchivedByTerm(
    term: string
  ): Observable<HemoglobinTest[]> {
    return this.http.get<HemoglobinTest[]>(
      `${this.url}/archived/search/term/${term}`
    );
  }

  // GET /glycemic-tests/patient/{id}/hemoglobin_test_last
  public getHemoglobinTestLast(patient_id: number): Observable<Date> {
    return this.http.get<Date>(
      `${this.url}/patient/${patient_id}/hemoglobin_test_last`
    );
  }
}
