import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar') menu: ElementRef;

  title = 'libreriaNg';
  isOpen = false;

  constructor(
    private renderer: Renderer2,
  ) {

  }

  ngOnInit() {

  }

  mostrarMenu() {
    this.isOpen = !this.isOpen;
    // console.log(this.isOpen);
    if (this.isOpen) {
      this.renderer.addClass(this.menu.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.menu.nativeElement, 'active');
    }
  }
}
