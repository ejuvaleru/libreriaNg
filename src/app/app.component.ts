import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar') menu: ElementRef; // Acceso al DOM con ViewChild, esto es para abrir y cerrar el menú lateral

  isOpen = false; // Para el menú
  isLogin: Observable<boolean>; // Con este observable podemos conocer si mi usuario está o no logueado
  usuario; // Variable que contiene el objeto usuario
  usuarioNombre = ''; // Nombre de mi usuario en sesión
 
  constructor(
    private renderer: Renderer2,
    public auth: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(this.usuario){
      this.usuarioNombre = this.usuario.nombre;
    }
    this.isLogin = this.auth.isLoggedIn();
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

  // Cerrar sesión
  logout() {
    this.mostrarMenu(); // Ocultar el menú
    this.auth.isLoginSubject.next(false); // Cambiamos el estado de nuestro observable a falso
    localStorage.removeItem('user'); // Removemos el objeto en el local Storage
    this.router.navigateByUrl('/'); // Navegamos a la ruta padre ó /login
  }
}
