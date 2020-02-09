import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-ejemplares',
  templateUrl: './ejemplares.component.html',
  styleUrls: ['./ejemplares.component.scss']
})
export class EjemplaresComponent implements OnInit {

  id: string;
  tituloLibro: string;
  ejemplares = [];
  existenEjemplares = false;
  isCargando = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private librosService: BooksService,

  ) { }

  ngOnInit() {
    this.isCargando = true;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.librosService.getEjemplaresPorLibroId(this.id).toPromise().then(res => {
      console.log(res);
      if (res.data.length > 0) {
        this.tituloLibro = res.data[0].titulo;
        console.log(res.data[0]);
        this.ejemplares = res.data[0].ejemplar;
        console.log(res);
        this.existenEjemplares = true;
        this.isCargando = false;
      } else {
        console.log('ENTRÉ!!!');
        this.tituloLibro = res.data.titulo;
        this.existenEjemplares = false;
        this.isCargando = false;
      }
    });
  }

  volver() {
    this.location.back();
  }

}
