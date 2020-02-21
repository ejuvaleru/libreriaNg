import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  url = 'http://localhost:4000/api/usuarios/auth';
  myHeader = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  usuario: any;

  constructor(
    private http: HttpClient
  ) { }

  cambiarEstado() {
    console.log(this.usuario);
    if (JSON.parse(localStorage.getItem('user'))) {

    } else {

    }
    console.log(this.isLoginSubject);
  }

  login(user: string, password: string): Observable<any> {
    console.log('INICIASTE SESIÓN CON: ', user, ' PASSWORD: ', password);
    const usuario = {
      usuario: user,
      contraseña: password
    };
    return this.http.post(this.url, usuario, { headers: { 'Content-Type': 'application/json' } });
  }

  logout() {

  }

  private hasToken(): boolean {
    return !!localStorage.getItem('user');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
