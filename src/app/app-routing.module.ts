import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes importados
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { BuscarLibrosComponent } from './pages/buscar-libros/buscar-libros.component';
import { EjemplaresComponent } from './pages/ejemplares/ejemplares.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { SoporteComponent } from './pages/soporte/soporte.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'agregar', component: AgregarComponent, canActivate: [AuthGuard] },

  {
    path: 'libros', children: [
      { path: '', component: LibrosComponent },
      { path: 'ejemplares/:id', component: EjemplaresComponent },
      { path: 'editar/:id', component: EditarComponent },
      { path: 'buscar-libros', component: BuscarLibrosComponent },
    ], canActivate: [AuthGuard]
  },
  {
    path: 'usuarios', children: [
      {path: '', component: UsuariosComponent},
      // {path: 'agregar-usuario', component: }
    ]
  },
  { path: 'soporte', component: SoporteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
