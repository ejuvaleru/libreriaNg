import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookapiService } from 'src/app/shared/bookapi.service';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  libroForm = this.fb.group({
    campoTitulo: ['', Validators.required],
    campoAutor: [''],
    campoEditorial: [''],
    campoIsbn: [''],
    campoEdicion: [''],
    campoPaginas: [''],
    campoEstado: [''],
    campoDesc: [''],
    campoCostoCompra: [''],
    campoCostoVenta: [''],
    campoCostoDescuento: [''],
    campoFecha: [''],
  });

  googleForm = this.fb.group({
    isbnApiCampo: ['', [Validators.required, Validators.minLength(13)]],
  });

  autor;
  isbnFromApi;
  libro;
  items: Resultado;
  cargando = false;
  editoriales = [];
  autores = [];
  libros = [];
  ID_LIBRO : number =0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookApiService: BookapiService,
    private librosService: BooksService,
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    // De esta manera accedemos al valor de todo el formulario
    // this.libroForm.value;

    // Así accedemos al valor de cada campo
    const resultado = this.libroForm.value;
    console.log(resultado.campoTitulo);
    // O así
    console.log(this.libroForm.get('campoAutor').value);
    let existeLibro: boolean = false;
    let existeAutor: boolean = false;
    let existeEditorial: boolean = false;
    const revisarCasos = async () => {
      this.librosService.getEditoriales().subscribe(async l => {
        this.editoriales = await l.data ;
        //console.log(this.editoriales);
        for (let editorial of this.editoriales) {
          //console.log(editorial.nombre_editorial);
          if (this.libro.editorial == editorial.nombre_editorial) {
            console.log(this.libro.editorial + " es igual a " + editorial.nombre_editorial)
            existeEditorial = true;
          }
        }
      });
      this.librosService.getAutores().subscribe(async l => {
        this.autores = await l.data;
        console.log(this.autores);
        for (let autor of this.autores) {
          if (this.libro.autor == autor.nombre_autor) {
            console.log(this.libro.autor + " es igual a " + autor.nombre_autor)
            existeAutor = true;
          }
        }
      });
      this.librosService.getLibros().subscribe(async l => {
        this.libros =await l.data;
        console.log(this.libros);
        for (let libroRespuesta of this.libros) {
          if (this.libro.isbn == libroRespuesta.isbn) {
            console.log(this.libro.isbn + " es igual a " + libroRespuesta.isbn)
            existeLibro = true;
            this.ID_LIBRO = libroRespuesta.ID_libro;
          }
        }
      });
      console.log("esixre libro" , existeLibro);
      if (existeLibro) {
        //caso2 sí existe libro
        let hoy = new Date();
        let ejemplar = {
          estado : this.libroForm.get('campoEstado'),
          descripcion: this.libroForm.get('campoDesc').value,
          costo_venta: this.libroForm.get('campoCostoVenta'),
          costo_compra: this.libroForm.get('campoCostoCompra'),
          costo_descuento: this.libroForm.get('campoCostoDescuento'),
          url_fotografia: this.libro.portada,
          fecha_adquisicion: hoy,
          ID_LIBRO_libro: this.ID_LIBRO
        };
        this.librosService.insertarEjemplar(ejemplar).subscribe(l => {
          console.log(l);
          this.router.navigateByUrl('');
        });

      } else {//no existe libro
        if (!existeAutor && !existeEditorial) {
          //caso1
        }
        if (!existeAutor && existeEditorial) {
          //caso3
        }
        if (existeEditorial && existeAutor) {
          //caso4
        }
        if (existeAutor && !existeEditorial) {
          //caso5
        }
      }

    }
    revisarCasos();

    this.libro = {
      titulo: this.libroForm.get('campoTitulo').value,
      autor: this.libroForm.get('campoAutor').value,
      editorial: this.libroForm.get('campoEditorial').value,
      edicion: this.libroForm.get('campoEdicion').value,
      descripcion: this.libroForm.get('campoDesc').value,
      noPaginas: this.libroForm.get('campoPaginas').value,
      isbn: this.libroForm.get('campoIsbn').value,
      portada: this.libroForm.get('campoTitulo').value,
    };
    let libro2 = {
      "num_pagina": 420,
      "num_edicion": 1,
      "isbn": "isbnFowler",
      "codigo_identificador": null,
      "titulo": "Qué es filosofia",
      "EDITORIAL_ID_editorial": 1,
      "NOMENCLATURA_ID_NOMENCLATURA": 1
    }
    //console.log(this.libro);

    //this.librosService.insertarEjemplar(libro2).subscribe(l => {
    //  console.log(l);
    //});

    /* Utilizando el angular Router, podemos navegar entre páginas, así que es muy util para volver automáticamente
     cuando el formulario es llenado y enviado */
    
  }

  async buscarPorIsbn() {
    this.cargando = true;
    console.log(this.googleForm.get('isbnApiCampo').value);
    const isbn = this.googleForm.get('isbnApiCampo').value;
    await this.bookApiService.getLibroByIsbn(isbn).subscribe(res => {
      this.items = res;
      if (this.items.totalItems === 0) {
        this.cargando = false;
        return;
      }
      console.log(res);
      this.items.items.forEach(element => {
        // console.log(element.volumeInfo.authors);
        element.volumeInfo.authors.forEach(a => {
          this.autor = a;
        });
        element.volumeInfo.industryIdentifiers.forEach(e => {
          if (e.type === 'ISBN_13') {
            this.isbnFromApi = e.identifier;
          }
        });
        this.cargando = false;
        this.libro = {
          titulo: element.volumeInfo.title,
          autor: this.autor,
          descripcion: element.volumeInfo.description,
          noPaginas: element.volumeInfo.pageCount,
          isbn: this.isbnFromApi,
          editorial: element.volumeInfo.publisher,
          portada: element.volumeInfo.imageLinks.thumbnail,
        };
      });
    });
  }

  rellenarForm() {
    this.libroForm.controls['campoAutor'].setValue(this.autor);
    this.libroForm = this.fb.group({
      campoTitulo: [this.libro.titulo],
      campoAutor: [this.autor],
      campoEditorial: [this.libro.editorial],
      campoIsbn: [this.isbnFromApi],
      campoEdicion: [''],
      campoPaginas: [this.libro.noPaginas],
      campoEstado: [''],
      campoDesc: [this.libro.descripcion],
      campoCostoCompra: [''],
      campoCostoVenta: [''],
      campoCostoDescuento: [''],
      campoFecha: [''],
    });
  }

}

interface Resultado {
  items?: any;
  totalItems?: any;
}
