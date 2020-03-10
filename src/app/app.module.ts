import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importamos esto para usar formularios 'reactivos'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importamos esta clase para realizar peticiones Http con la clase HttpClient
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { BuscarLibrosComponent } from './pages/buscar-libros/buscar-libros.component';
import { EjemplaresComponent } from './pages/ejemplares/ejemplares.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { SoporteComponent } from './pages/soporte/soporte.component';
import { NomenclaturasComponent } from './pages/nomenclaturas/nomenclaturas.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { EditarEjemplarComponent } from './pages/editar-ejemplar/editar-ejemplar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AgregarComponent,
    EditarComponent,
    LibrosComponent,
    BuscarLibrosComponent,
    EjemplaresComponent,
    LoginComponent,
    UsuariosComponent,
    SoporteComponent,
    NomenclaturasComponent,
    VentasComponent,
    EditarEjemplarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
