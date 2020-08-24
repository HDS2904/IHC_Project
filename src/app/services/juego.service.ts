import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { JuegoModel } from '../models/juego';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private url = 'https://jobra.herokuapp.com/';

  constructor( private http: HttpClient ) { }

  public getAll(): any {
    return this.http.get(`${this.url}juego/`)
      .pipe(
        map( this.tratamiento)
      );
  }

  private tratamiento( juegoObj: object): JuegoModel[] {
    const juegos: JuegoModel[] = [];

    if ( juegoObj === null ){
      return [];
    }else {
      Object.keys( juegoObj ).forEach( key => {
        const ani: JuegoModel = juegoObj[key];
        for (const iterator of ani.consoles){
          const aux: JuegoModel = new JuegoModel();
          aux.id = ani.id;
          aux.consoles = [iterator];
          aux.genders = ani.genders;
          aux.name = ani.name;
          aux.description = ani.description;
          aux.release_day = ani.release_day;
          juegos.push(aux);
        }
      });
    }
    return juegos;
  }

  public getOne( id: number) {
    return this.http.get(`${this.url}juego/${id}`);
  }

}
