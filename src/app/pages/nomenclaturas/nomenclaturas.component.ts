import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-nomenclaturas',
  templateUrl: './nomenclaturas.component.html',
  styleUrls: ['./nomenclaturas.component.scss']
})
export class NomenclaturasComponent implements OnInit {

  nomenclaturas = [];

  constructor(
    private bookService: BooksService
  ) { }

  ngOnInit() {
    this.bookService.getNomenclaturas().toPromise().then(res => {
      console.log(res.data);
      this.nomenclaturas = res.data;
    });
  }

}
