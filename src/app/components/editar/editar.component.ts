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

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BooksService,
  ) { }

  // Este ciclo de vida de Angular permite crear todo lo que necesitamos para trabajar con el libro
  // IGNORAR errores en la consola respecto al Form, carga y actualiza los valores sin problema
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.libro = this.bookService.obtenerLibroId(this.id).subscribe(l => {
      this.libro = l;
      console.log(this.libro);
      if (l) {
        this.formulario();
      }
    });
  }

  // Formulario
  async formulario() {
    this.formEditarLibro = await this.fb.group({
      'campoTitulo': [this.libro.titulo],
      'campoIsbn': [this.libro.isbn],
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

  volver() {
    this.location.back();
  }

}
