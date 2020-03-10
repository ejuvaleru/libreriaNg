import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-ejemplar',
  templateUrl: './editar-ejemplar.component.html',
  styleUrls: ['./editar-ejemplar.component.scss']
})
export class EditarEjemplarComponent implements OnInit {
  // Objeto ejemplar, aquí podemos sustituir con el modelo
  ejemplar;

  // ID, lo obtenemos a traves de la URL, después será un id real, ahorita es la posición en el array
  id;
  idLibro;

  formEditarEjemplar: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BooksService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['idEjemplar'];
    this.idLibro = this.route.snapshot.params['id'];
    console.log(this.id);
    this.bookService.getEjemplarePorId(this.id).subscribe(e => {
      console.log('res ', e);

      if (e) {
        this.ejemplar = e;
        this.formulario();
      }

    });
  }


  // Con este método actualizamos el ejemplar
  onSubmit() {

    let ejemplar = {
      estado: this.formEditarEjemplar.get('campoEstado').value,
      descripcion: this.formEditarEjemplar.get('campoDescripcion').value,
      costo_venta: this.formEditarEjemplar.get('campoCostoVenta').value,
      costo_compra: this.formEditarEjemplar.get('campoCostoCompra').value,
      costo_descuento: this.formEditarEjemplar.get('campoCostoDescuento').value,
      fecha_adquisicion: this.formEditarEjemplar.get('campoFechaAdquisicion').value,

    }
    this.bookService.actualizarEjemplar(this.id, ejemplar).subscribe(res => {
      console.log('RES', res);
      if (res.message === 'Ejemplar actualizado correctamente') {
        this.router.navigateByUrl(`/libros/ejemplares/${this.idLibro}`);
      }
    });
  }

  // Formulario
  async formulario() {
    this.formEditarEjemplar = await this.fb.group({
      'campoEstado': [this.ejemplar.estado],
      'campoDescripcion': [this.ejemplar.descripcion],
      'campoCostoVenta': [this.ejemplar.costo_venta],
      'campoCostoCompra': [this.ejemplar.costo_compra],
      'campoCostoDescuento': [this.ejemplar.costo_descuento],
      'campoFechaAdquisicion': [this.ejemplar.fecha_adquisicion],
    });
  }

  volver() {
    this.location.back();
  }

}
