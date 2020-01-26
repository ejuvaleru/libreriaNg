import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = 'http://localhost:4000/api/libros/';

  constructor(
    private http: HttpClient,
  ) { }


  // TODO: más adelante aquí podríamos implementar los modelos definidos
  // Arreglo de libros o ejemplares
  libros = [];

  // Método para agregar, aquí sustituimos con una query
  agregarLibro(libro) {
    this.libros.push(libro);
  }

  // Método de consulta, ya sea para editar o ver detalles, aquí sustituimos con una query
  obtenerLibroId(id) {
    return this.http.get(`${this.url}${id}`);
  }

  actualizarLibro(id, libro): Observable<any> {
    return this.http.put(`${this.url}${id}`, libro, { headers: { 'Content-Type': 'application/json' } });
  }

  // Método para eliminar, aquí sustituimos con una query
  eliminar(id) {
    this.libros.splice(id, 1);
  }

  getLibros(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}
