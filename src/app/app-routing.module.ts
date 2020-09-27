import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard'

// Componentes creados
import { HomeComponent } from './components/home/home.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { JuegoComponent } from './components/juego/juego.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CarroComponent } from './components/carro/carro.component';
import { CompraComponent } from './components/compra/compra.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'juego/:id', component: JuegoComponent },
  { path:'login', component:LoginComponent},
  { path:'registro',component:RegistroComponent},
  { path:'perfil',component:PerfilComponent, canActivate:[AuthGuard]},
  { path:'carro', component:CarroComponent},
  { path:'compra',component:CompraComponent},
  { path:'ayuda',component:AyudaComponent},
  { path:'servicios',component:ServiciosComponent},
  { path:'nosotros',component:NosotrosComponent},
  { path:'contactenos',component:ContactenosComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
