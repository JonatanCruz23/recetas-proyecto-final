import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from 'src/app/model/receta';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiZXNhdWciLCJpZCI6IjYzMmYzNzI1MjA3NDFjNmQyN2NhNjVjNCIsImlhdCI6MTY2NDMyNTY4OSwiZXhwIjoxNjY0MzY4ODg5fQ.8MXPIUfiIgWCgK2qweavIMSkkl7F1jHQx964BhmBx10'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  ruta = 'https://api-recetas-modulo-v.herokuapp.com/receta';
  recetas: Receta[] = [];

  constructor(private http:HttpClient) { }

  crearReceta(receta: Receta) {
    return this.http.post(this.ruta, receta, httpOptions);
  }

  getReceta(){
    return   this.http.get<Receta[]>(this.ruta, httpOptions).subscribe( response => {
      console.log(response);
      this.recetas = response;
    })
  }

  deleteReceta(_id: string) {
    return this.http.delete(`${this.ruta}/${_id}`, httpOptions )
  }
}
