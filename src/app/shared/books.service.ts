import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = 'http://localhost:4000/api/';
  myHeader = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(
    private http: HttpClient,
  ) { }

  // TODO: más adelante aquí podríamos implementar los modelos definidos
  insertarLibro(libro): Observable<any> {
    console.log(libro);
    return this.http.post(`${this.url}libros/`, libro, { headers: { 'Content-Type': 'application/json' } });
  }

  // Método de consulta, ya sea para editar o ver detalles, aquí sustituimos con una query
  obtenerLibroId(id) {
    return this.http.get(`${this.url}libros/${id}`);
  }

  actualizarLibro(id, libro): Observable<any> {
    return this.http.put(`${this.url}libros/${id}`, libro, { headers: { 'Content-Type': 'application/json' } });
  }

  getUltimoLibroAgregado(): Observable<any> {
    return this.http.get(`${this.url}libros/max/max`);
  }
  // Método para eliminar, aquí sustituimos con una query
  eliminar(id) {

  }

  getEjemplaresPorLibroId(id): Observable<any> {
    return this.http.get(`${this.url}ejemplares/${id}/libro`);
  }

  // Obtenemos todos los libros de la base de datos
  getLibros(): Observable<any> {
    console.log('Petición de libros');
    return this.http.get(`${this.url}libros`);
  }

  insertarEditorial(editorial): Observable<any> {
    return this.http.post(`${this.url}editoriales/`, editorial, { headers: { 'Content-Type': 'application/json' } });
  }

  // Obtenemos todas las editoriales de la BD
  getEditoriales(): Observable<any> {
    return this.http.get(`${this.url}editoriales/`);
  }

  getUltimaEditorialAgregada(): Observable<any> {
    return this.http.get(`${this.url}editoriales/max/max`);
  }

  // Insertamos un autor a la BD
  insertarAutor(autor): Observable<any> {
    return this.http.post(`${this.url}autores/`, autor, { headers: { 'Content-Type': 'application/json' } });
  }

  insertarAutorLibro(autorLibro): Observable<any> {
    return this.http.post(`${this.url}autoresLibros/`, autorLibro, { headers: { 'Content-Type': 'application/json' } });
  }

  // Obtenemos autores de la BD
  getAutores(): Observable<any> {
    return this.http.get(`${this.url}autores/`);
  }

  getUltimoAutorAgregado(): Observable<any> {
    return this.http.get(`${this.url}autores/max/max`);
  }

  insertarEjemplar(ejemplar): Observable<any> {
    console.log(ejemplar);
    return this.http.post(`${this.url}ejemplares/`, ejemplar, { headers: { 'Content-Type': 'application/json' } });
  }

  // Obtenemos todas las editoriales de la BD
  getAreas(): Observable<any> {
    return this.http.get(`${this.url}areas/`);
  }

  getSubareabyIDarea(id): Observable<any> {
    return this.http.get(`${this.url}subareas/byID_area?AREA_ID_area=${id}`);
  }

  getTemabyIDsubarea(id): Observable<any> {
    return this.http.get(`${this.url}temas/byID_subarea?SUBAREA_ID_subarea=${id}`);
  }

  getSubtemabyIDtema(id): Observable<any> {
    return this.http.get(`${this.url}subtemas/byID_tema?TEMA_ID_tema=${id}`);
  }

  getSubsubtemabyIDsubtema(id): Observable<any> {
    return this.http.get(`${this.url}subsubtemas/byID_subtema?SUBTEMA_ID_subtema=${id}`);
  }

  getNomenclaturabyIDdatos(areaid, subareaid, temaid, subtemaid, subsubtemaid): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.url}nomenclaturas/datos?AREA_ID_area=${areaid}&SUBAREA_ID_subarea=${subareaid}&TEMA_ID_tema=${temaid}&SUBTEMA_ID_subtema=${subtemaid}&SUBSUBTEMA_ID_subsubtema=${subsubtemaid}`);
  }

}
