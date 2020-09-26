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


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'juego/:id', component: JuegoComponent },
  { path:'login', component:LoginComponent},
  { path:'registro',component:RegistroComponent},
  { path:'perfil',component:PerfilComponent, canActivate:[AuthGuard]},
  { path:'carro', component:CarroComponent},
  { path:'compra',component:CompraComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
