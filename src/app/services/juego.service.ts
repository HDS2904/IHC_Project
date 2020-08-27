import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { JuegoModel } from '../models/juego';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private url = 'https://jobra.herokuapp.com/';

  constructor( private http: HttpClient ) { }

  public getAll( genero: number, offset: string): any {

    const params = new HttpParams({
      fromObject: {
        limit: '5',
        offset
      }
    });

    if ( genero === 0 ){
      return this.http.get(`${this.url}juego/`, { params })
        .pipe(
          map( this.tratamiento )
        );
    }else {
      return this.http.get(`${this.url}juego/genero/${genero}`, { params })
        .pipe(
          map( this.tratamiento )
        );
    }
  }

  private tratamiento( juegoObj: object): JuegoModel[] {
    const juegos: JuegoModel[] = [];
    juegoObj = juegoObj['results'];

    if ( juegoObj === [] ){
      return [ ];
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

  public getGen( genero: string, limit: string, offset: string) {
    const params = new HttpParams({
      fromObject: {
        limit,
        offset
      }
    });

    return this.http.get(`${this.url}juego/`, { params })
      .pipe(
        map( this.tratamiento )
      );
  }

}
