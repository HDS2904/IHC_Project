import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://jobra.herokuapp.com";

  userToken:string;
  //Registrar usuario
  // /usuario/signup/

  //Login
  //  /usuario/login/

  constructor(private http:HttpClient) {
    this.leerToken();
  }

  login(usuario:UsuarioModel){
    const authData = {
      "email": usuario.correo,
      "password": usuario.password
    }

    return this.http.post(`${this.url}/usuario/login/`,authData)
      .pipe(
        map( resp => {
          this.guardarToken(resp['access_token']);
          return resp;
        })
      );

  }

  logout(){

  }

  nuevoUsuario(usuario:UsuarioModel){
    

    const authData = {
      "email": usuario.correo,
      "username": usuario.username,
      "password": usuario.password,
      "password_confirmation": usuario.c_password,
      "first_name": usuario.nombres,
      "last_name": usuario.apellidos,
      "birthday": usuario.fech_nac,
      "phone_number":usuario.telefono
    }

    return this.http.post(`${this.url}/usuario/signup/`,authData);

    
  }

  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    } else {
      this.userToken=null;
    }

    return this.userToken;

  }

  estaAutenticado():boolean{
    if(this.userToken==null){
      return false;
    } else {
      return this.userToken.length>2;
    }

  }

}
