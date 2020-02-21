import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.isLoggedIn().subscribe(r => {
      console.log('Desde el auth guard login: ', r);
      if (r) {
        this.router.navigateByUrl('/dashboard');
      }
    })
    // Si no está logueado le da acceso
    return true;
  }
}
