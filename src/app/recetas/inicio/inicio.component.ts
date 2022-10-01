import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../services/recetas.service';
import { Receta } from 'src/app/model/receta';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public recetaService: RecetasService) { }

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
        console.log(res)
      },
      err => {
        console.log(err);
      }
    )
  }

}
