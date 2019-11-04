import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookapiService } from 'src/app/shared/bookapi.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  libroForm = this.fb.group({
    campoTitulo: ['', Validators.required],
    campoAutor: [''],
    campoIsbn: [''],
    campoEdicion: [''],
    campoPaginas: [''],
    campoEstado: [''],
    campoDesc: [''],
    campoCostoCompra: [''],
    campoCostoVenta: [''],
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookapiService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // De esta manera accedemos al valor de todo el formulario
    // this.libroForm.value;

    // Así accedemos al valor de cada campo
    const resultado = this.libroForm.value;
    console.log(resultado.campoTitulo);
    // O así
    console.log(this.libroForm.get('campoAutor').value);

    /* Utilizando el angular Router, podemos navegar entre páginas, así que es muy util para volver automáticamente
     cuando el formulario es llenado y enviado */
    this.router.navigateByUrl('');
  }

  async buscarPorIsbn() {
    this.cargando = true;
    console.log(this.googleForm.get('isbnApiCampo').value);
    const isbn = this.googleForm.get('isbnApiCampo').value;
    await this.bookService.getLibroByIsbn(isbn).subscribe(res => {
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
      campoIsbn: [this.isbnFromApi],
      campoEdicion: [''],
      campoPaginas: [this.libro.noPaginas],
      campoEstado: [''],
      campoDesc: [this.libro.descripcion],
      campoCostoCompra: [''],
      campoCostoVenta: [''],
      campoFecha: [''],
    });
  }

}

interface Resultado {
  items?: any;
  totalItems?: any;
}
