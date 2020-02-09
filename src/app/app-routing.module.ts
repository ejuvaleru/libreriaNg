import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes importados
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { BuscarLibrosComponent } from './pages/buscar-libros/buscar-libros.component';
import { EjemplaresComponent } from './pages/ejemplares/ejemplares.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agregar', component: AgregarComponent },

  {
    path: 'libros', children: [
      { path: '', component: LibrosComponent },
      { path: 'ejemplares/:id', component: EjemplaresComponent },
      { path: 'editar/:id', component: EditarComponent },
      { path: 'buscar-libros', component: BuscarLibrosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
