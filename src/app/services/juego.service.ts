import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { JuegoModel } from '../models/juego';
import { Observable } from 'rxjs';
import { JuegoDetailModel } from '../models/juegoDetail';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  logeado:number=0;
  jsCarros:JuegoModel[]=[];
  private url = 'https://jobra.herokuapp.com/';

  constructor( private http: HttpClient ) { }
  public getCarros(){
    return this.jsCarros;
  }

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
