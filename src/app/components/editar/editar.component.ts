import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  // Objeto libro, aquí podemos sustituir con el modelo
  libro;
  // ID, lo obtenemos a traves de la URL, después será un id real, ahorita es la posición en el array
  id;
  titulo = '';
  formEditarLibro: FormGroup;

  idEditorial: number; // Utilizado para obtener la información de la editorial (búsqueda por ID)
  editorial;

  autorNombre = '';

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BooksService,
  ) { }

  // Este ciclo de vida de Angular permite crear todo lo que necesitamos para trabajar con el libro
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.bookService.obtenerLibroId(this.id).subscribe(l => {
      if (l) {
        this.libro = l;
        this.idEditorial = this.libro.EDITORIAL_ID_editorial;
        this.bookService.getEditorialPorId(this.idEditorial).toPromise().then(res => {
          if (res.code === 200) {
            this.editorial = res.data;
            console.log(this.editorial);
            this.obtenerAutorLibro(this.id).then(res => {
              console.log(res.data);
              if (res.code === 200) {
                const idAutor = res.data.AUTOR_ID_autor;
                console.log('ID AUTOR ', idAutor);
                this.obtenerAutorPorId(idAutor).then(autor => {
                  console.log(autor.nombre_autor);
                  this.autorNombre = autor.nombre_autor;
                  this.formulario();
                });
              }
            });
          }
        });
        console.log(this.libro);
      }
    });
  }

  // Formulario
  async formulario() {
    this.formEditarLibro = await this.fb.group({
      'campoTitulo': [this.libro.titulo],
      'campoAutor': [this.autorNombre],
      'campoIsbn': [this.libro.isbn],
      'campoNoPagina': [this.libro.num_pagina],
      'campoNoEdicion': [this.libro.num_edicion],
      'campoEditorial': [this.editorial.nombre_editorial],
    });
  }

  // Con este método actualizamos el libro
  onSubmit() {
    this.libro.titulo = this.formEditarLibro.get('campoTitulo').value;
    this.libro.isbn = this.formEditarLibro.get('campoIsbn').value;
    this.bookService.actualizarLibro(this.id, this.libro).subscribe(res => {
      console.log('RES', res);
      if (res.message === 'Libro actualizado correctamente') {
        this.router.navigateByUrl('/libros');
      }
    });
  }

  // Búscamos en la tabla AutorLibro los registros que coincidan con el autor
  obtenerAutorLibro(id): Promise<any> {
    return this.bookService.getAutorLibroPorIdLibro(id).toPromise();
  }

  // Una vez obtenida la tabla AutorLibro utilizamos el id del autor para obtenerlo de la tabla autores
  obtenerAutorPorId(id): Promise<any> {
    return this.bookService.getAutorPorId(id).toPromise();
  }

  volver() {
    this.location.back();
  }

}
