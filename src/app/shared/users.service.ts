import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:4000/api/';
  // myHeader = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}usuarios/`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.url}roles/`);
  }

  getRolPorId(id): Observable<any> {
    return this.http.get(`${this.url}roles/${id}`);
  }
}
