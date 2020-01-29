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

  items: Resultado;
  isbnFromApi;
  libro;

  cargando = false;

  // Arrays que guardan las respuestas obtenidas desde la BD
  editoriales = [];
  autores = [];
  libros = [];
  // Banderas auxiliares para los casos de inserción
  existeLibro = false;
  existeAutor = false;
  existeEditorial = false;

  ejemplar: any;
  idLibro = 0;
  idUltimaEditorial = 0;
  idUltimoAutor = 0;
  idUltimoLibro = 0;
  autor;
  editorial;


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
          this.editorial = editorial.nombre_editorial;//PARA YA NO VOLVER A CONSULTAR EN LOS CASOS
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
          this.autor = autor.nombre_autor;//PARA YA NO VOLVER A CONSULTAR EN LOS CASOS
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
          this.idLibro = libroRespuesta.ID_libro;
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
      console.log('LIBRO ID ', this.idLibro);
      const n = Math.random() * (0 - 99999) + 1;
      this.ejemplar = {
        estado: this.libroForm.get('campoEstado').value,
        descripcion: this.libroForm.get('campoDesc').value,
        costo_venta: this.libroForm.get('campoCostoVenta').value,
        costo_compra: this.libroForm.get('campoCostoCompra').value,
        costo_descuento: this.libroForm.get('campoCostoDescuento').value,
        url_fotografia: `urldesdeangular${n}`,
        fecha_adquisicion: hoy.getDate(),
        LIBRO_ID_libro: this.idLibro
      };
      console.log(this.ejemplar);
      this.librosService.insertarEjemplar(this.ejemplar).subscribe(e => {
        console.log(e);
        this.router.navigateByUrl('');
      });

    } else {// no existe libro
      if (!this.existeAutor && !this.existeEditorial) {
        console.log('CASO 1');
        // caso1 no existe nada y se crea todo
        this.insertarAutor().then(a => { // Inserta el autor
          console.log('AUTOR INSERTADO', a);
          if (a.data) {
            this.librosService.getUltimoAutorAgregado().toPromise().then(uaa => {
              console.log('ULTIMO AUTOR AGREGADO: ', uaa.data[0].maxIDautor);
              this.idUltimoAutor = uaa.data[0].maxIDautor;
            });
            this.insertarEditorial().then(r => { // Inserta la editorial
              console.log('EDITORIAL INSERTADA ', r);
              if (r.data) {
                this.librosService.getUltimaEditorialAgregada().toPromise().then(uea => {
                  console.log('ULTIMA EDITORIAL AGREGADA: ', uea.data[0].maxIDeditorial);
                  if (uea) {
                    this.idUltimaEditorial = uea.data[0].maxIDeditorial;
                    const libro = {
                      num_pagina: this.libroForm.get('campoPaginas').value,
                      num_edicion: this.libroForm.get('campoEdicion').value,
                      EDITORIAL_ID_editorial: this.idUltimaEditorial,
                      isbn: this.libroForm.get('campoIsbn').value,
                      codigo_identificador: null,
                      NOMENCLATURA_ID_NOMENCLATURA: 1,
                      titulo: this.libroForm.get('campoTitulo').value,
                    };
                    this.librosService.insertarLibro(libro).toPromise().then(l => {
                      if (l.data) {
                        this.librosService.getUltimoLibroAgregado().toPromise().then(ula => {
                          console.log('ULTIMO LIBRO AGREGADO ID', ula.data[0].maxIDlibro);
                          this.idUltimoLibro = ula.data[0].maxIDlibro;
                          const autorLibro = {
                            LIBRO_ID_libro: this.idUltimoLibro,
                            AUTOR_ID_autor: this.idUltimoAutor
                          };
                          this.insertarAutorLibro(autorLibro).then(res => {
                            if (res.data) {
                              this.idLibro = this.idUltimoLibro;
                              this.insertarEjemplar();
                            }
                          });
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });

      }
      if (!this.existeAutor && this.existeEditorial) {
        // caso3
        console.log('CASO 3');
        this.insertarAutor().then(a => {
          console.log('AUTOR INSERTADO', a);
          if (a.data) {
            this.librosService.getUltimoAutorAgregado().toPromise().then(uaa => {
              console.log('ULTIMO AUTOR AGREGADO: ', uaa.data[0].maxIDautor);
              this.idUltimoAutor = uaa.data[0].maxIDautor;
              if (uaa) {
                this.idUltimaEditorial = this.editorial //PORQUE SE LE ASIGNÓ EN LE METODO getEditoriales
                const libro = {
                  num_pagina: this.libroForm.get('campoPaginas').value,
                  num_edicion: this.libroForm.get('campoEdicion').value,
                  EDITORIAL_ID_editorial: this.idUltimaEditorial,
                  isbn: this.libroForm.get('campoIsbn').value,
                  codigo_identificador: null,
                  NOMENCLATURA_ID_NOMENCLATURA: 1,
                  titulo: this.libroForm.get('campoTitulo').value,
                };
                this.librosService.insertarLibro(libro).toPromise().then(l => {
                  if (l.data) {
                    this.librosService.getUltimoLibroAgregado().toPromise().then(ula => {
                      console.log('ULTIMO LIBRO AGREGADO ID', ula.data[0].maxIDlibro);
                      this.idUltimoLibro = ula.data[0].maxIDlibro;
                      const autorLibro = {
                        LIBRO_ID_libro: this.idUltimoLibro,
                        AUTOR_ID_autor: this.idUltimoAutor
                      };
                      this.insertarAutorLibro(autorLibro).then(res => {
                        if (res.data) {
                          this.idLibro = this.idUltimoLibro;
                          this.insertarEjemplar();
                        }
                      });
                    });
                  }
                });
              }
            });
          }
        });
      }
      if (this.existeEditorial && this.existeAutor) {
        // caso4
        console.log('CASO 4');
      }
      if (this.existeAutor && !this.existeEditorial) {
        // caso5
        console.log('CASO 5'); //existe autor pero no editorial
        this.insertarEditorial().then(e => {
          console.log('EDITORIAL INSERTADA', e);
          if(e.data){
            this.librosService.getUltimaEditorialAgregada().toPromise().then(uea => {
              console.log('ULTIMA EDICION AGREGADA: ', uea.data[0].maxIDeditorial);
              this.idUltimaEditorial = uea.data[0].maxIDeditorial;
              if(uea){
                this.idUltimoAutor = this.autor //PORQUE SE LE ASIGNÓ EN EL METODO getAutores
                const libro = {
                  num_pagina: this.libroForm.get('campoPaginas').value,
                  num_edicion: this.libroForm.get('campoEdicion').value,
                  EDITORIAL_ID_editorial: this.idUltimaEditorial,
                  isbn: this.libroForm.get('campoIsbn').value,
                  codigo_identificador: null,
                  NOMENCLATURA_ID_NOMENCLATURA: 1,
                  titulo: this.libroForm.get('campoTitulo').value,
                };
                this.librosService.insertarLibro(libro).toPromise().then(l => {
                  if (l.data) {
                    this.librosService.getUltimoLibroAgregado().toPromise().then(ula => {
                      console.log('ULTIMO LIBRO AGREGADO ID', ula.data[0].maxIDlibro);
                      this.idUltimoLibro = ula.data[0].maxIDlibro;
                      const autorLibro = {
                        LIBRO_ID_libro: this.idUltimoLibro,
                        AUTOR_ID_autor: this.idUltimoAutor
                      };
                      this.insertarAutorLibro(autorLibro).then(res => {
                        if (res.data) {
                          this.idLibro = this.idUltimoLibro;
                          this.insertarEjemplar();
                        }
                      });
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  }

  async insertarEjemplar() {
    const hoy = new Date();
    console.log('LIBRO ID ', this.idLibro);
    const n = Math.random() * (0 - 99999) + 1; // Uso esto para generar una url de foto aleatoria para TEST

    this.ejemplar = {
      estado: this.libroForm.get('campoEstado').value,
      descripcion: this.libroForm.get('campoDesc').value,
      costo_venta: this.libroForm.get('campoCostoVenta').value,
      costo_compra: this.libroForm.get('campoCostoCompra').value,
      costo_descuento: this.libroForm.get('campoCostoDescuento').value,
      url_fotografia: `urldesdeangular${n}`,
      fecha_adquisicion: hoy,
      LIBRO_ID_libro: this.idLibro
    };

    console.log(this.ejemplar);
    this.librosService.insertarEjemplar(this.ejemplar).subscribe(e => {
      console.log(e);
      if (e.message) {
        this.router.navigateByUrl('');
      }
    });

  }

  // Método para insertar editorial
  async insertarEditorial() {
    const editorial = {
      nombre_editorial: this.libroForm.get('campoEditorial').value,
    };
    console.log('DESDE AGREGAR COMP EDITORIAL ', editorial);
    return await this.librosService.insertarEditorial(editorial).toPromise();
  }

  // Método para insertar autor
  async insertarAutor() {
    const autor = {
      nombre_autor: this.libroForm.get('campoAutor').value,
    };
    console.log('DESDE AGREGAR COMP autor ', autor);
    return await this.librosService.insertarAutor(autor).toPromise();
  }

  // Método para isnertar AutorLibro
  async insertarAutorLibro(autorLibro) {
    return await this.librosService.insertarAutorLibro(autorLibro).toPromise();
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
