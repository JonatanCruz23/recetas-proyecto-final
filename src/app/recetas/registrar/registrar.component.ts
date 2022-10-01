import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Receta, Ingrediente, Paso } from 'src/app/model/receta';
import { RecetasService } from '../services/recetas.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {
  
  id = '';
  paramsSubscription: Subscription = new Subscription;

  constructor(public recetaService: RecetasService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.recetaService.traerToken();
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if(this.id) this.getReceta(this.id);
  }
 //VARIABLES PARA GUARDAR INGREDIENTES
  nuevoIngredienteNombre: string = '';
  cantidad!: number 
  unidad!: string 

  loadingSavebtn!: boolean;
  loadingEditbtn!: boolean;
  imagenCambiada!: boolean;
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

  clearReceta(form: NgForm, reset: boolean) {
    this.loadingSavebtn = false;
    this.loadingEditbtn = false;
    this.imagenCambiada = false;
    if(reset) form.resetForm();
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
    this.imagenCambiada = true;
    this.uploadedImage = event.target.files[0];
  }

  guardar(receta: Receta, form: NgForm) {
    if (!localStorage.getItem('token')) return this.router.navigate(['login'])
    if(this.id) {
      return this.actualizarReceta(receta, form);
    } else {
      return this.crearReceta(receta, form);
    }

  }

  crearReceta(receta: Receta, form: NgForm) {
    this.loadingSavebtn = true;
    return this.recetaService.crearReceta(receta).subscribe(
      res => {
        if(this.uploadedImage) {
          this.recetaService.subirImagen(res._id, this.uploadedImage).subscribe(response => {
            this.clearReceta(form, true);
            console.log(response);
            console.log("Imagen subida correctamente!.");
          },
          err => {
            this.clearReceta(form, true);
            console.log(err);
          });
        } else {
          this.clearReceta(form, true);
          console.log(res);
        }
      },
      err => {
        this.clearReceta(form, true);
        console.log(err);
      }
    )
  }

  actualizarReceta(receta: Receta, form: NgForm) {
    this.loadingEditbtn = true;
    return this.recetaService.actualizarReceta(receta, this.id).subscribe(
      res => {
        if(this.uploadedImage) {
          this.receta = res;
          this.recetaService.subirImagen(res._id, this.uploadedImage).subscribe(response => {
            this.receta.portada = response.portada;
            this.clearReceta(form, false);
            console.log(response);
            console.log("Imagen subida correctamente!.");
          },
          err => {
            this.clearReceta(form, false);
            console.log(err);
          });
        } else {
          this.clearReceta(form, false);
          console.log(res);
        }
      },
      err => {
        this.clearReceta(form, false);
        console.log(err);
      }
    )
  }

  getReceta(id :string) {
    return this.recetaService.getRecetaId(id).subscribe(
      res => {
        this.receta = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  //RESETEAR LOS ARREGLOS DE INGREDIENTES Y PASOS
  
}
