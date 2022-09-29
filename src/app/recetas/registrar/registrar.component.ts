import { Component, OnInit } from '@angular/core';
import { Receta, Ingrediente, Paso } from 'src/app/model/receta';
import { RecetasService } from '../services/recetas.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {

  constructor(public recetaService: RecetasService) { }

  ngOnInit(): void {}
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

  nuevaReceta() {
    for (let i = this.receta.ingredientes.length; i > 0; i--) {
      this.receta.ingredientes.pop();
    }

    for (let i = this.receta.pasos.length; i > 0; i--) {
      this.receta.pasos.pop();
    }
  }

////////////////////agregar pasos///////////////////////////////

  numeroPaso!: number ;
  decripcionPaso!: string ;

  agregarPasos() {
    const nuevoPaso: Paso = {
      id: this.receta.pasos.length + 1 * Math.random(),
      numero: this.numeroPaso,
      descripcion: this.decripcionPaso
    }

    this.receta.pasos.push({ ...nuevoPaso });
    this.numeroPaso = 1 ;
    this.decripcionPaso = '';
    console.log(this.receta)
  }

  eliminarPaso( index: number ) {
    this.receta.pasos.splice(index, 1);
  }

  onImagechange(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  guardar(receta: Receta) {
    this.loadingSavebtn = true;
    this.recetaService.crearReceta(receta).subscribe(
      res => {
        if(this.uploadedImage) {
          this.recetaService.subirImagen(res._id, this.uploadedImage).subscribe(response => {
            this.loadingSavebtn = false;
            console.log(response);
            console.log("Imagen subida correctamente!.");
          },
          err => {
            this.loadingSavebtn = false;
            console.log(err);
          })
        } else {
          this.loadingSavebtn = false;
          console.log(res);
        }
      },
      err => {
        this.loadingSavebtn = false;
        console.log(err);
      }
    )
    console.log('formulario posteado');
    console.log(this.receta)
  }

  //RESETEAR LOS ARREGLOS DE INGREDIENTES Y PASOS
  
}
