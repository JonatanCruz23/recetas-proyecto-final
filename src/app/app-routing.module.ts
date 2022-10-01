import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTablaComponent } from './recetas/listado-tabla/listado-tabla.component';
import { LoginComponent } from './recetas/login/login.component';
import { RegistrarComponent } from './recetas/registrar/registrar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro/:id', component: RegistrarComponent },
  { path: 'registro', component: RegistrarComponent },
  { path: 'listado', component: ListadoTablaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [LoginComponent, RegistrarComponent]