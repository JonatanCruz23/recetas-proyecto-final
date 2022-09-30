import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/model/receta';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-listado-tabla',
  templateUrl: './listado-tabla.component.html',
  styleUrls: ['./listado-tabla.component.css']
})
export class ListadoTablaComponent implements OnInit {

  constructor(public recetaService: RecetasService, private router: Router) { }

  ngOnInit(): void {
    this.listarRecetas();
  }
  
  recetas: Receta[] = []

  listarRecetas() {
    return this.recetaService.getReceta().subscribe(
      res => {
        if(res.length > 0) {
          this.recetas = res;
        } else {
          
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  eliminarReceta(id: string | undefined) {
    console.log(id);
    return this.recetaService.deleteReceta(id).subscribe(
      res => {
        return this.recetaService.getReceta().subscribe(
          response => {
            if(response.length > 0) {
              this.recetas = response;
            } else {
              console.log("No se encontraron.");
            }
          },
          error => {
            console.log(error);
          }
        )
      },
      err => {
        console.log(err);
      }
    )
  }

  editarReceta(id: string | undefined) {
    return this.recetaService.getReceta().subscribe(
      res => {
        if(res.length > 0) {
          this.recetas = res;
        } else {
          
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
