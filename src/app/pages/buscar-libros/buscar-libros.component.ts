import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-buscar-libros',
  templateUrl: './buscar-libros.component.html',
  styleUrls: ['./buscar-libros.component.scss']
})
export class BuscarLibrosComponent implements OnInit {

  isPorAutor = false;
  isPorTitulo = false;

  @ViewChild('checkAutor') checkAutor: ElementRef; // Así accedemos al DOM
  @ViewChild('checkTitulo') checkTitulo: ElementRef;

  valorBusqueda = '';
  mensajeError = '';

  constructor() { }

  ngOnInit() { }

  buscar() {
    if (this.valorBusqueda === '') { // Previene que el campo se quede vacío
      this.mensajeError = 'No debe estar el campo vacío';
      return console.log('Ingresa algo ');
    }
    // tslint:disable-next-line:max-line-length
    if (this.checkAutor.nativeElement.checked && this.checkTitulo.nativeElement.checked) { // Previene que seleccionen los dos check a la vez
      this.mensajeError = 'SÓLO PUEDES BUSCAR POR UN CAMPO A LA VEZ';
      return console.log('SÓLO PUEDES BUSCAR POR UN CAMPO A LA VEZ');
    }
    // tslint:disable-next-line:max-line-length
    if (!this.checkAutor.nativeElement.checked && !this.checkTitulo.nativeElement.checked) { // Previene no se seleccione al menos un check
      this.mensajeError = 'Debes seleccionar un checkbox al menos';
      return console.log('Debes seleccionar un check al menos');
    }
    this.mensajeError = '';
    console.log('BUSCANDO'); // Este mensaje me indica que ya pasó las validaciones y hará la búsqueda

    // tslint:disable-next-line:max-line-length
    if (this.checkAutor.nativeElement.checked || this.checkTitulo.nativeElement.checked) { // Validamos si alguno de los dos check está seleccionado

      // Aquí podría hacerse la petición a la API, ya sea que busque por autor o por titulo del libro
      this.isPorAutor = this.checkAutor.nativeElement.checked;
      console.log('EN EL IF POR AUTOR: ', this.isPorAutor);

      this.isPorTitulo = this.checkTitulo.nativeElement.checked;
      console.log('EN EL IF POR TITULO: ', this.isPorTitulo);

      console.log(this.valorBusqueda); // De esta manera accedemos al valor del campo
    } else {
      // Con esto asignamos a falso o unchecked los campos en caso de que se deseleccionen
      this.isPorAutor = this.checkAutor.nativeElement.checked;
      this.isPorTitulo = this.checkTitulo.nativeElement.checked;
    }

    // Mensajes de test para ver que sí se volvieron a falso o true, depende el caso
    console.log('POR AUTOR? ', this.isPorAutor);
    console.log('POR TITULO? ', this.isPorTitulo);
  }

}
