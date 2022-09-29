import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from 'src/app/model/receta';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiZXNhdWciLCJpZCI6IjYzMmYzNzI1MjA3NDFjNmQyN2NhNjVjNCIsImlhdCI6MTY2NDQzNTY1NSwiZXhwIjoxNjY0NDc4ODU1fQ.7sh3xT29Mu8PgLg0qwwiJNfAbzdPGd1JOK-nOkoLk6U'
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
    return this.http.post<Receta>(this.ruta, receta, httpOptions);
  }

  subirImagen(idReceta: string | undefined, image: File) {
    const imageFormData = new FormData();
    imageFormData.append('image', image, image?.name);

    return this.http.post(`${this.ruta}/${idReceta}/upload`, imageFormData, httpOptions);
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
