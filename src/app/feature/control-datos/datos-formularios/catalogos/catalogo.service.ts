import { Injectable } from '@angular/core';
import { Catalog } from './catalogo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = environment.API_URL +'/catalogs';

  // GET /catalogs
  public getCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.url);
  }

  // GET /catalogs/:key
  public getCatalogsByType(type: string): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.url}/${type}`);
  }

  // GET /catalogs/id/:id
  public getCatalogItem(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.url}/id/${id}`);
  }

  // GET /catalogs/type/:type/value/:value
  public getCatalogItemByTypeAndValue(
    type: string,
    value: string
  ): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.url}/type/${type}/value/${value}`);
  }

  // POST /catalogs/create
  public createCatalog(catalogo: Catalog): Observable<Catalog> {
    return this.http.post<Catalog>(
      `${this.url}/create`,
      catalogo,
      this.httpOptions
    );
  }

  // PUT /catalogs/update/:id
  public updateCatalog(catalogo: Catalog): Observable<Catalog> {
    return this.http.put<Catalog>(
      `${this.url}/update/${catalogo.id}`,
      catalogo,
      this.httpOptions
    );
  }

  // DELETE /catalogs/delete/:id
  public deleteCatalog(id: number): Observable<Catalog> {
    return this.http.delete<Catalog>(
      `${this.url}/delete/${id}`,
      this.httpOptions
    );
  }

  // GET /catalogs/search/:type/:term
  public searchCatalogsByTerm(
    type: string,
    term: string
  ): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.url}/search/${type}/${term}`);
  }

  // GET /catalogs/validate/value/:type/:value/:id
  public checkCatalogValueIsAvailable(
    type: string,
    value: string,
    id?: number
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.url}/validate/value/${type}/${value}/${id}`
    );
  }
}
