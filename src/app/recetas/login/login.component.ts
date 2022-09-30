import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecetasService } from '../services/recetas.service';
import { LoginI, ResponseI } from 'src/app/model/login.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)
  })

  constructor(private api: RecetasService, private router: Router) { }

  ngOnInit(): void {
    this.closeSsesion();
  }

  verificarToken() {
    if (localStorage.getItem('token')){
      this.router.navigate(['listado'])
    }
  }
  
  closeSsesion() {
    localStorage.removeItem('token');
  }

  erroresStado: boolean = false
  mensajeError: string = ''

  onLogin(form: any) {
    console.log(typeof (form))
    this.api.loginByEmail(form).subscribe(data => {
      let dateResponse: any = data;

      if (dateResponse.status === 406) {
        this.mensajeError = 'Nombre de usuario invalido!'
        this.erroresStado = true
        console.log('no existe el nombre de usuario')
      } else if (dateResponse == false) {
        this.mensajeError = 'Password incorrecta!'
        this.erroresStado = true
        console.log('constraseña incorrecta');
      } else {
        localStorage.setItem("token", dateResponse.access_token)
        this.router.navigate(['listado'])
        console.log(dateResponse.access_token)
      }
      console.log(data)
    })
  }

}
