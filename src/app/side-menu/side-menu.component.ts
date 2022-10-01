import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router) { }

  loginEstado: string = '';
  listado: string = '';
  nuevaReceta: string = '';

  cambiarStado(){
    if (localStorage.getItem('token')){
      this.loginEstado = 'Cerrar sessión'
      this.listado = 'Listado'
      this.nuevaReceta = 'Nueva receta'
    }else{
      this.listado = ''
      this.nuevaReceta = ''
      this.loginEstado = 'Login'
    }
  }

  serrarSecion(){
    this.router.navigate(['inicio'])
  }


  ngOnInit(): void {
     this.cambiarStado()
  }

}

