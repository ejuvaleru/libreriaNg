import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  hoy: Date;

  constructor() { }

  ngOnInit() {
    this.hoy = new Date();
  }

}
