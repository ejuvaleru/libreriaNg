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
  ID_LIBRO = 0;
  existeLibro = false;
  existeAutor = false;
  existeEditorial = false;
  ejemplar: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookApiService: BookapiService,
    private librosService: BooksService,
  ) { }

  ngOnInit() {
  }

  async getEditoriales() {
    const res = this.librosService.getEditoriales().toPromise();
    res.then(async e => {
      this.editoriales = await e.data;
      console.log('EDITORIALES ', this.editoriales);
      // tslint:disable-next-line:prefer-const
      for (let editorial of this.editoriales) {
        if (this.libroForm.get('campoEditorial').value === editorial.nombre_editorial) {
          console.log(this.libroForm.get('campoEditorial').value + ' es igual a ' + editorial.nombre_editorial);
          return this.existeEditorial = true;
        }
      }
    });
  }

  async getAutores() {
    const res = this.librosService.getAutores().toPromise();
    res.then(async l => {
      this.autores = await l.data;
      console.log(this.autores);
      // tslint:disable-next-line:prefer-const
      for (let autor of this.autores) {
        if (this.libroForm.get('campoAutor').value === autor.nombre_autor) {
          console.log(this.libroForm.get('campoAutor').value + ' es igual a ' + autor.nombre_autor);
          return this.existeAutor = true;
        }
      }
    });
  }

  async getLibros() {
    const res = this.librosService.getLibros().toPromise();
    res.then(async l => {
      this.libros = await l.data;
      console.log(this.libros);
      // tslint:disable-next-line:prefer-const
      for (let libroRespuesta of this.libros) {
        if (this.libroForm.get('campoIsbn').value === libroRespuesta.isbn) {
          console.log(this.libroForm.get('campoIsbn').value + ' es igual a ' + libroRespuesta.isbn);
          this.ID_LIBRO = libroRespuesta.ID_libro;
          this.existeLibro = true;
        }
      }
      this.crear();
    });
  }

  async onSubmit() {
    await this.getEditoriales().finally(async () => {
      await this.getAutores().finally(async () => {
        await this.getLibros().finally(async () => {
        });
      });
    });

    /* Utilizando el angular Router, podemos navegar entre páginas, así que es muy util para volver automáticamente
     cuando el formulario es llenado y enviado */
  }

  crear() {
    console.log('Existe libro', this.existeLibro);
    if (this.existeLibro) {
      console.log('YA ENTRÉ A SÍ EXISTE LIBRO ');
      // caso2 sí existe libro
      const hoy = new Date();
      console.log('LIBRO ID ', this.ID_LIBRO);
      const n = Math.random() * (0 - 99999) + 1;
      this.ejemplar = {
        estado: this.libroForm.get('campoEstado').value,
        descripcion: this.libroForm.get('campoDesc').value,
        costo_venta: this.libroForm.get('campoCostoVenta').value,
        costo_compra: this.libroForm.get('campoCostoCompra').value,
        costo_descuento: this.libroForm.get('campoCostoDescuento').value,
        url_fotografia: `urldesdeangular${n}`,
        fecha_adquisicion: hoy.getDate(),
        LIBRO_ID_libro: this.ID_LIBRO
      };
      console.log(this.ejemplar);
      this.librosService.insertarEjemplar(this.ejemplar).subscribe(e => {
        console.log(e);
        this.router.navigateByUrl('');
      });

    } else {// no existe libro
      if (!this.existeAutor && !this.existeEditorial) {
        console.log('CASO 1');
        // caso1
      }
      if (!this.existeAutor && this.existeEditorial) {
        // caso3
      }
      if (this.existeEditorial && this.existeAutor) {
        // caso4
      }
      if (this.existeAutor && !this.existeEditorial) {
        // caso5
      }
    }
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
