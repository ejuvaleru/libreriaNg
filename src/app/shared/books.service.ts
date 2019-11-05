import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // TODO: más adelante aquí podríamos implementar los modelos definidos
  // Arreglo de libros o ejemplares
  libros = [];

  constructor() { }

  agregarLibro(libro) {
    this.libros.push(libro);
  }

  // When user selects edit option
  editar(id) {

  }

  eliminar(id) {
    this.libros.splice(id, 1);
  }
}
