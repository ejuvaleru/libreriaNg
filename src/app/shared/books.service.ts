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

  getEditoriales(): Observable<any>{
    return this.http.get(`http://localhost:4000/api/editoriales/`);
  }

  getAutores():  Observable<any>{
    return this.http.get(`http://localhost:4000/api/autores/`);
  }
  insertarAutor(autor): Observable<any>{
    //let autorNombre ={
    //  "nombre_autor": "Luis "
    //}
    return this.http.post(`http://localhost:4000/api/autores/`,autor);
  } 

  insertarEditorial(editorial): Observable<any>{
    let editorial2= {
      "nombre_editorial": "The pragmatic bookshelf"
    }
    return this.http.post(`http://localhost:4000/api/editoriales/`,editorial2);
  } 

  insertarAutorLibro(autorLibro): Observable<any>{
    //let autorLibro2= {
    //  "LIBRO_ID_libro": 1,
    //  "AUTOR_ID_autor": 3
    //}
    return this.http.post(`http://localhost:4000/api/autoresLibros/`,autorLibro);
  } 
  insertarEjemplar(ejemplar): Observable<any>{
    //let autorLibro2= {
    //  "estado": "usado",
    //  "descripcion": "hojas rayadas",
    //  "costo_venta": 100,
    //  "costo_compra": 20,
    //  "costo_descuento": 80,
    //  "url_fotografia": "http://tuCorazzon",
    //  "fecha_adquisicion": "2020-01-15",
    //  "LIBRO_ID_libro": 1
    //}
    return this.http.post(`http://localhost:4000/api/ejemplares/`,ejemplar);
  } 
}
