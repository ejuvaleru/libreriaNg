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
    isbnApiCampo: ['', Validators.required],
  });

  autor;
  isbnFromApi;
  libro;
  items: Resultado;

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
    console.log(this.googleForm.get('isbnApiCampo').value);
    const isbn = this.googleForm.get('isbnApiCampo').value;
    await this.bookService.getLibroByIsbn(isbn).subscribe(res => {
      this.items = res;
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

}

interface Resultado {
  items?: any;
}
