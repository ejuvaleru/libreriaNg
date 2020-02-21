import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('alerta') alerta: ElementRef;

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private render: Renderer2
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.cambiarEstilo('none');
  }

  crearFormulario() {
    this.loginForm = this.fb.group({
      campoUsuario: ['', Validators.required],
      campoPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    const usuario = this.loginForm.get('campoUsuario').value;
    const pass = this.loginForm.get('campoPassword').value;
    this.authService.login(usuario, pass).toPromise().then(res => {
      console.log('IS LOGGED IN', res.isLoggedIn);
      if (res.data) {
        this.authService.isLoginSubject.next(true);
        this.authService.usuario = res.data;
        localStorage.setItem('user', JSON.stringify(this.authService.usuario));
        console.log(JSON.parse(localStorage.getItem('user')));
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        this.errorMessage = 'Credenciales incorrectas.';
        this.cambiarEstilo('block');
      }
    });
  }

  onDismiss() {
    this.cambiarEstilo('none');
  }

  cambiarEstilo(estilo: string) {
    this.render.setStyle(this.alerta.nativeElement, 'display', estilo);
  }
}