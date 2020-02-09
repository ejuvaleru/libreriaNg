import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {

  // Aquí asignamos la data que recibimos del service 'BooksService'
  librosT = [];
  libros = [];
  ejemplares = [];
  existenEjemplares: boolean;
  isCargando: boolean;
  cantidadEjemplares: number;

  constructor(
    private libroService: BooksService,
  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.librosT = [];
    this.libros = [];

    this.libroService.getLibros().subscribe(ls => {
      this.librosT = ls.data;
      console.log(this.librosT);
      this.librosT.forEach(a => {
        this.libroService.getEjemplaresPorLibroId(a.ID_libro).toPromise().then(res => {
          if (res.data.length > 0) {
            this.ejemplares = res.data[0].ejemplar;
            this.existenEjemplares = true;
            this.isCargando = false;
            this.libros.push({
              cEjemplares: this.ejemplares.length,
              a
            });
          } else {
            console.log('ENTRÉ!!!');
            this.existenEjemplares = false;
            this.isCargando = false;
            this.libros.push({
              cEjemplares: 0,
              a
            });
          }
        });
      });
    });
  }

}
