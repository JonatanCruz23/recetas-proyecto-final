import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './recetas/registrar/registrar.component';
import { LoginComponent } from './recetas/login/login.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ListadoTablaComponent } from './recetas/listado-tabla/listado-tabla.component';
import { InicioComponent } from './recetas/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    LoginComponent,
    SideMenuComponent,
    ListadoTablaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
