import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Receta, Ingrediente, Paso } from 'src/app/model/receta';
import { RecetasService } from '../services/recetas.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {

  constructor(public recetaService: RecetasService, private router: Router) { }


  ngOnInit(): void {
    this.recetaService.traerToken();
  }
 //VARIABLES PARA GUARDAR INGREDIENTES
  nuevoIngredienteNombre: string = '';
  cantidad!: number 
  unidad!: string 

  loadingSavebtn!: boolean;
  uploadedImage!: File;
  receta: Receta = {
    nombre: '',
    descripcion: '',
    portada: '',
    ingredientes: [],
    pasos: []
  }

// LOGUICA PARA AGREGAR INGREDIENTES

  agregarIngrediente() {
    const nuevoIngrediente: Ingrediente = {
      id: this.receta.ingredientes.length + 1 * Math.random(),
      nombre: this.nuevoIngredienteNombre,
      cantidad: this.cantidad,
      unidad: this.unidad
    }

    this.receta.ingredientes.push({ ...nuevoIngrediente });
    this.nuevoIngredienteNombre = '';
    this.cantidad = 0;
    this.unidad = '';
    console.log(this.receta)
  }

  eliminarIngrediente( index: number ) {
    this.receta.ingredientes.splice(index, 1);
  }

  clearReceta(form: NgForm) {
    this.loadingSavebtn = false;

    form.resetForm();
    for (let i = this.receta.ingredientes.length; i > 0; i--) {
      this.receta.ingredientes.pop();
    }

    for (let i = this.receta.pasos.length; i > 0; i--) {
      this.receta.pasos.pop();
    }
  }


////////////////////agregar pasos/////////////////////////////

  numeroPaso!: number ;
  decripcionPaso!: string ;

  agregarPasos() {
    const nuevoPaso: Paso = {
      id: this.receta.pasos.length + 1 * Math.random(),
      numero: this.numeroPaso,
      descripcion: this.decripcionPaso
    }

    this.receta.pasos.push({ ...nuevoPaso });
    this.numeroPaso = 1;
    this.decripcionPaso = '';
    console.log(this.receta);
  }

  eliminarPaso( index: number ) {
    this.receta.pasos.splice(index, 1);
  }

  onImagechange(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  guardar(receta: Receta, form: NgForm) {
    if (!localStorage.getItem('token')) return this.router.navigate(['login'])

    this.loadingSavebtn = true;
      return this.recetaService.crearReceta(receta).subscribe(
      res => {
        if(this.uploadedImage) {
          this.recetaService.subirImagen(res._id, this.uploadedImage).subscribe(response => {
            this.clearReceta(form);
            console.log(response);
            console.log("Imagen subida correctamente!.");
          },
          err => {
            this.clearReceta(form);
            console.log(err);
          });
        } else {
          this.clearReceta(form);
          console.log(res);
        }
      },
      err => {
        this.clearReceta(form);
        console.log(err);
      }
    )
  }

  //RESETEAR LOS ARREGLOS DE INGREDIENTES Y PASOS
  
}
