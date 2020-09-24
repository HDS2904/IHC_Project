import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://jobra.herokuapp.com";
  usuario:any;
  userToken:string;
  id:number;
  //Registrar usuario
  // /usuario/signup/

  //Login
  //  /usuario/login/

  //Get usuario
  // /usuario/id/cliente/

  //Actualizar Usuario
  // /usuario/id/cliente/

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
          this.getUsuario(resp['user_id']).subscribe( u => {
            this.guardarUsuario(u);
          });
          this.guardarToken(resp['access_token']);
          
          this.guardarId(resp['user_id']);
          
          return resp;
        })
      );

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id')
    this.userToken="";
  }

  actualizarUsuario(usuario:UsuarioModel,idUser:number){
    const authData = {
      "email": usuario.correo,
      "username": usuario.username,
      "last_name": usuario.apellidos,
      "first_name": usuario.nombres,
      "phone_number":usuario.telefono,
      "cliente": {
        "credit_card":usuario.tarjeta,
      }
    }

    return this.http.put(`${this.url}/usuario/${idUser}/cliente/`,authData);
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

  private getUsuario(idUser:number){
    return this.http.get(`${this.url}/usuario/${idUser}/cliente/`);
  }

  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);
  }

  private guardarUsuario(user:any){
    this.usuario=user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  private guardarId(idUser:number){
    this.id=idUser;
    localStorage.setItem('id', JSON.stringify(idUser));
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
