import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = 'http://localhost:4000/api/libros/';
  myHeader = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(
    private http: HttpClient,
  ) { }

  // TODO: más adelante aquí podríamos implementar los modelos definidos
  // Arreglo de libros o ejemplares
  libros = [];
  // Método para agregar, aquí sustituimos con una query
  insertarLibro(libro): Observable<any> {
    //this.libros.push(libro);
    console.log(libro);
    return this.http.post(`${this.url}`, libro);
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

  getEditoriales(): Observable<any> {
    return this.http.get(`http://localhost:4000/api/editoriales/`);
  }

  getAutores(): Observable<any> {
    return this.http.get(`http://localhost:4000/api/autores/`);
  }
  insertarAutor(autor): Observable<any> {
    //let autorNombre ={
    //  "nombre_autor": "Luis "
    //}
    return this.http.post(`http://localhost:4000/api/autores/`, autor);
  }

  insertarEditorial(editorial): Observable<any> {
    return this.http.post(`http://localhost:4000/api/editoriales/`, editorial);
  }

  insertarAutorLibro(autorLibro): Observable<any> {
    return this.http.post(`http://localhost:4000/api/autoresLibros/`, autorLibro);
  }
  insertarEjemplar(ejemplar): Observable<any> {
    console.log(ejemplar);
    return this.http.post(`http://localhost:4000/api/ejemplares/`, ejemplar, { headers: { 'Content-Type': 'application/json' }});
  }
}
