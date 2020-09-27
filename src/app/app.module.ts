import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularTiltModule} from 'node_modules/angular-tilt';

import { HttpClientModule } from '@angular/common/http';


import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { JuegoComponent } from './components/juego/juego.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CarroComponent } from './components/carro/carro.component';
import { CompraComponent } from './components/compra/compra.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    JuegosComponent,
    JuegoComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    PerfilComponent,
    CarroComponent,
    CompraComponent,
    AyudaComponent,
    NosotrosComponent,
    ServiciosComponent,
    ContactenosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTiltModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
