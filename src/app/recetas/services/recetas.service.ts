import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from 'src/app/model/receta';
import { LoginI, ResponseI } from 'src/app/model/login.interface';
import { Observable } from 'rxjs';

// let token: any = localStorage.getItem("token")

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  ruta= 'https://api-recetas-modulo-v.herokuapp.com/receta'
  url_login = 'https://api-recetas-modulo-v.herokuapp.com/auth/login'

  recetas: Receta[] = []

  constructor(private http:HttpClient) { }

   

  traerToken(){
    if (localStorage.getItem('token')){
      return {
        headers: new HttpHeaders({
              'Authorization': `Bearer ${localStorage.getItem('token')}`
             })
      }
    }
    else { return {}}
  }

  // METODO PARA
  loginByEmail(form: LoginI){
    let direccion = this.url_login;
    return this.http.post(direccion, form )
  }


  crearReceta(receta: Receta){
    return this.http.post<Receta>(this.ruta, receta, this.traerToken());
  }

  subirImagen(idReceta: string | undefined, image: File) {
    const imageFormData = new FormData();
    imageFormData.append('image', image, image?.name);

    return this.http.post(`${this.ruta}/${idReceta}/upload`, imageFormData, this.traerToken());
  }

  getReceta(){
    return this.http.get<Receta[]>(this.ruta, this.traerToken());
  }

  deleteReceta(_id: string | undefined){
    return this.http.delete<Receta>(`${this.ruta}/${_id}`, this.traerToken());
  }

}
