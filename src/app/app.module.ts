import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AgregarComponent,
    EditarComponent,
    LibrosComponent,
    BuscarLibrosComponent,
    EjemplaresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
