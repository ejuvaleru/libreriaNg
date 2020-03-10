import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
})
export class LibrosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'isbn', 'edicion', 'cEjemplares', 'acciones'];
  dataSource: MatTableDataSource<Libros>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
              id: a.ID_libro,
              paginas: a.num_pagina,
              edicion: a.num_edicion,
              titulo: a.titulo,
              isbn: a.isbn
            });
            this.dataSource = new MatTableDataSource(this.libros);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            console.log('ENTRÉ!!!');
            this.existenEjemplares = false;
            this.isCargando = false;
            this.libros.push({
              cEjemplares: 0,
              a
            });
          }
          console.log(this.libros);
        });
      });
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

export interface Libros {

  cEjemplares: number,
  ID_libro: number,
  num_pagina: number,
  num_edicion: number,
  isbn: string,
  codigo_identificador: null,
  titulo: string,
  EDITORIAL_ID_editorial: number,
  NOMENCLATURA_ID_NOMENCLATURA: number
}