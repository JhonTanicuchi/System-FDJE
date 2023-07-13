import { Injectable } from '@angular/core';
import { Permission } from './permiso';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = environment.API_URL + '/permissions';

  // GET /permissions
  public getPermisos(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.url);
  }

  // GET /permissions/role/:id
  public getPermisosByRol(roleId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.url}/role/${roleId}`);
  }

}
