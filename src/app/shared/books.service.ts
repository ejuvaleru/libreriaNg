import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // TODO: más adelante aquí podríamos implementar los modelos definidos
  // Arreglo de libros o ejemplares
  libros = [];

  constructor() { }

  // Método para agregar, aquí sustituimos con una query
  agregarLibro(libro) {
    this.libros.push(libro);
  }

  // Método de consulta, ya sea para editar o ver detalles, aquí sustituimos con una query
  obtenerLibroId(id) {
    return this.libros[id];
  }

  // Método para eliminar, aquí sustituimos con una query
  eliminar(id) {
    this.libros.splice(id, 1);
  }
}
