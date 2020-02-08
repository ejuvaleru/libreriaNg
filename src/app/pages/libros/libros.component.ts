import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {

  // Aquí asignamos la data que recibimos del service 'BooksService'
  libros = [];

  constructor(
    private libroService: BooksService,
  ) { }

  ngOnInit() {
    this.libroService.getLibros().subscribe(l => {
      this.libros = l.data;
      console.log(this.libros);
    });
  }

}
