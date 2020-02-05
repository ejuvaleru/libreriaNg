import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';
import { State } from './state';

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
  // Arreglo de libros o ejemplares
  // Método para agregar, aquí sustituimos con una query
  insertarLibro(libro): Observable<any> {

    console.log(libro);
    return this.http.post(`${this.url}libros/`, libro, { headers: { 'Content-Type': 'application/json' } });
  }

  // Método de consulta, ya sea para editar o ver detalles, aquí sustituimos con una query
  obtenerLibroId(id) {
    return this.http.get(`${this.url}${id}`);
  }

  actualizarLibro(id, libro): Observable<any> {
    return this.http.put(`${this.url}/libros/${id}`, libro, { headers: { 'Content-Type': 'application/json' } });
  }

  getUltimoLibroAgregado(): Observable<any> {
    return this.http.get(`${this.url}libros/max/max`);
  }
  // Método para eliminar, aquí sustituimos con una query
  eliminar(id) {

  }

  // Obtenemos todos los libros de la base de datos
  getLibros(): Observable<any> {
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

  getSubareabyIDarea(id): Observable <any>{
    return this.http.get(`${this.url}subareas?ID_subarea=${id}`);
  }

  getTemabyIDsubarea(id): Observable <any>{
    return this.http.get(`${this.url}temas?ID_tema=${id}`);
  }

  getSubtemabyIDtema(id): Observable <any>{
    return this.http.get(`${this.url}subtemas?ID_subtema=${id}`);
  }
  
  getSubsubtemabyIDsubtema(id): Observable <any>{
    return this.http.get(`${this.url}subsubtemas?ID_subsubtema=${id}`);
  }
 

  //esto es del ejemplo, BORRAR DESPUES!!!!  
  getCountries() {
    return [
     new Country(1, 'USA' ),
     new Country(2, 'Brazil' ),
    ];
  }
  
  getStates() {
   return [
     new State(1,  'Arizona' ),
     new State(2,  'Alaska' ),
     new State(3,  'Florida'),
     new State(4,  'Hawaii'),
     new State(5,  'Sao Paulo' ),
     new State(6,  'Rio de Janeiro'),
     new State(7,  'Minas Gerais' )
    ];
  }
}
