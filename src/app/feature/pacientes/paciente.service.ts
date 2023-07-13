import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from './paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = environment.API_URL + '/patients';

  // GET /patients
  public getPacientes(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }

  // GET /patients/:id
  public getPaciente(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  // POST /patients/create
  public addPaciente(paciente: Patient): Observable<Patient> {
    return this.http.post<Patient>(
      `${this.url}/create`,
      paciente,
      this.httpOptions
    );
  }

  // PUT /patients/:id
  public updatePaciente(paciente: Patient): Observable<Patient> {
    return this.http.put<Patient>(
      `${this.url}/update/${paciente.id}`,
      paciente,
      this.httpOptions
    );
  }

  // GET /patients/archived/list
  public getPacientesArchived(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/archived/list`);
  }

  // ARCHIVE /patients/archive/:id
  public archivePaciente(id: number): Observable<Patient> {
    return this.http.put<Patient>(
      `${this.url}/archive/${id}`,
      this.httpOptions
    );
  }

  // RESTORE /patients/restore/:id
  public restorePaciente(id: number): Observable<Patient> {
    return this.http.put<Patient>(
      `${this.url}/restore/${id}`,
      this.httpOptions
    );
  }

  // DELETE /patients/delete/:id
  public deletePaciente(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.url}/delete/${id}`);
  }

  // GET /patients/search/value/:term
  public searchPacientesByTerm(term: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/search/term/${term}`);
  }

  // GET /patients/archived/search/value/:term
  public searchPacientesArchivedByTerm(term: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/archived/search/term/${term}`);
  }

  // GET /patients/chart/month-year/:year
  public getPatientsPerMonthPerYear(year: number): Observable<any> {
    return this.http.get<any>(`${this.url}/chart/month-year/${year}`);
  }

  // GET /users/validate/identification/:identification/:id?
  public checkIdentificationIsAvailable(
    identification: string,
    id?: number
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.url}/validate/identification/${identification}/${id}`
    );
  }

  // GET /users/validate/email/:email/:id?
  public checkEmailIsAvailable(
    email: string,
    id?: number
  ): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/validate/email/${email}/${id}`);
  }
}
