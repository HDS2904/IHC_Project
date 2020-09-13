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

  public getAll( ): any {

    // const params = new HttpParams({
    //   fromObject: {
    //     limit: '5',
    //     offset
    //   }
    // });
    return this.http.get(`${this.url}juego/`)
      .pipe(
        map( this.tratamiento )
      );
  }

  private tratamiento( juegoObj: object): JuegoModel[] {
    const juegos: JuegoModel[] = [];
    if ( juegoObj === [] ){
      return [ ];
    }else {
      Object.keys( juegoObj ).forEach( key => {
        const ani: JuegoModel = juegoObj[key];
        juegos.push(ani);
      });
    }
    return juegos;
  }

  public getOne( id: number) {
    return this.http.get(`${this.url}juego/${id}`);
  }

  public getGender( id: number ) {
    return this.http.get(`${this.url}juego/${id}/generos/`)
      .pipe(
        map( this.tratamiento )
      );
  }

}
