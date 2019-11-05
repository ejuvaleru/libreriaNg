import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  formEditarLibro: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BooksService,
  ) { }

  // Este ciclo de vida de Angular permite crear todo lo que necesitamos para trabajar con el libro
  // IGNORAR errores en la consola respecto al Form, carga y actualiza los valores sin problema
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.libro = this.bookService.obtenerLibroId(this.id);
    console.log(this.libro);
    this.formulario();
  }

  // Formulario
  async formulario() {
    this.formEditarLibro = await this.fb.group({
      'campoTitulo': [this.libro.campoTitulo],
      'campoAutor': [this.libro.campoAutor],
      'campoIsbn': [this.libro.campoIsbn],
      'campoEdicion': [this.libro.campoEdicion],
      'campoPaginas': [this.libro.campoPaginas],
      'campoEstado': [this.libro.campoEstado],
      'campoDesc': [this.libro.campoDesc],
      'campoCostoCompra': [this.libro.campoCostoCompra],
      'campoCostoVenta': [this.libro.campoCostoVenta],
      'campoFecha': [this.libro.campoFecha],
    });
  }

  // Con este método actualizamos el libro
  onSubmit() {
    this.libro.campoTitulo = this.formEditarLibro.get('campoTitulo').value;
    this.libro.campoAutor = this.formEditarLibro.get('campoAutor').value;
    this.libro.campoIsbn = this.formEditarLibro.get('campoIsbn').value;
    this.libro.campoEdicion = this.formEditarLibro.get('campoEdicion').value;
    this.libro.campoPaginas = this.formEditarLibro.get('campoPaginas').value;
    this.libro.campoEstado = this.formEditarLibro.get('campoEstado').value;
    this.libro.campoDesc = this.formEditarLibro.get('campoDesc').value;
    this.libro.campoCostoCompra = this.formEditarLibro.get('campoCostoCompra').value;
    this.libro.campoCostoVenta = this.formEditarLibro.get('campoCostoVenta').value;
    this.libro.campoFecha = this.formEditarLibro.get('campoFecha').value;
    console.log('Editado: ', this.libro);
    this.router.navigateByUrl('/');
  }

}
