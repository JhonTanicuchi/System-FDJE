import { Injectable } from '@angular/core';
import { SuppliesDelivery } from './entrega-insumo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SuppliesDeliveriesService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = environment.API_URL + '/supplies-deliveries';

  // GET /supply-deliveries
  getSuppliesDeliveries(): Observable<SuppliesDelivery[]> {
    return this.http.get<SuppliesDelivery[]>(`${this.url}`);
  }

  // GET /supply-deliveries/:id
  getSuppliesDelivery(id: number): Observable<SuppliesDelivery> {
    return this.http.get<SuppliesDelivery>(`${this.url}/${id}`);
  }

  // GET /supply-deliveries/patients/list
  getSuppliesDeliveriesWithPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/patients/list`);
  }

  // POST /supply-deliveries/create
  createSuppliesDelivery(
    entregaInsumo: SuppliesDelivery
  ): Observable<SuppliesDelivery> {
    return this.http.post<SuppliesDelivery>(
      `${this.url}/create`,
      entregaInsumo,
      this.httpOptions
    );
  }

  // PUT /supply-deliveries/update/:id
  updateSuppliesDelivery(
    entregaInsumo: SuppliesDelivery
  ): Observable<SuppliesDelivery> {
    return this.http.put<SuppliesDelivery>(
      `${this.url}/update/${entregaInsumo.id}`,
      entregaInsumo,
      this.httpOptions
    );
  }

  // GET /supply-deliveries/archived/list
  getSuppliesDeliveriesArchived(): Observable<SuppliesDelivery[]> {
    return this.http.get<SuppliesDelivery[]>(`${this.url}/archived/list`);
  }

  // PUT /supply-deliveries/archive/:id
  archiveSuppliesDelivery(id: number): Observable<SuppliesDelivery> {
    return this.http.put<SuppliesDelivery>(
      `${this.url}/archive/${id}`,
      this.httpOptions
    );
  }

  // PUT /supply-deliveries/restore/:id
  restoreSuppliesDelivery(id: number): Observable<SuppliesDelivery> {
    return this.http.put<SuppliesDelivery>(
      `${this.url}/restore/${id}`,
      this.httpOptions
    );
  }

  // DELETE /supply-deliveries/delete/:id
  deleteSuppliesDelivery(id: number): Observable<SuppliesDelivery> {
    return this.http.delete<SuppliesDelivery>(`${this.url}/delete/${id}`);
  }

  // GET /supply-deliveries/patients/search/term/:term
  searchSuppliesDeliveriesWithPatientsByTerm(
    term: string
  ): Observable<SuppliesDelivery[]> {
    return this.http.get<SuppliesDelivery[]>(
      `${this.url}/patients/search/term/${term}`
    );
  }

  // GET /supply-deliveries/search/tem/:term
  searchSuppliesDeliveriesByTerm(term: string): Observable<SuppliesDelivery[]> {
    return this.http.get<SuppliesDelivery[]>(`${this.url}/search/term/${term}`);
  }

  // GET /supply-deliveries/Archived/search/:term
  searchSuppliesDeliveriesArchivedByTerm(
    term: string
  ): Observable<SuppliesDelivery[]> {
    return this.http.get<SuppliesDelivery[]>(
      `${this.url}/archived/search/term/${term}`
    );
  }

  // GET /supplies-deliveries/statistics/:2023-02
  getStatisticsSuppliesDeliveredByMonth(
    date: Date
  ): Observable<SuppliesDelivery[]> {
    return this.http.get<SuppliesDelivery[]>(`${this.url}/statistics/${date}`);
  }
}
