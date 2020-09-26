import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { JuegoModel } from 'src/app/models/juego';
import { JuegoService } from 'src/app/services/juego.service';
import { range } from 'rxjs';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  juegos: JuegoModel[] = [];
  loading = false;
  panel: JuegoModel[] = [];
  genero: number;
  precio = 0;
  section: number;
  numSec: number[] = [];
  //@Output() aCarro= new EventEmitter<JuegoModel[]>();
  constructor( private juegoService: JuegoService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.juegoService.getAll()
      .subscribe( resp => {
        this.juegos = resp;
        this.getSec( 1 );
        this.loading = false;
        this.numSec = Array( Math.floor((this.juegos.length / 9) + 1) );
      });
    this.section = 0;
    this.genero = 0;
  }
  public nJuegoCarro(item:JuegoModel){
    if(this.juegoService.jsCarros.length==0){
      this.juegoService.jsCarros.push(item);
    }
    else{
      for(let i=0;i<this.juegoService.jsCarros.length;i++){
        if(item.id_juego!=this.juegoService.jsCarros[i].id_juego){
          this.juegoService.jsCarros.push(item);
        }
      }
    }
    //this.aCarro.emit(this.juegosCarro);
  }

  public getGen( id: number) {
    this.juegoService.getGender( id )
      .subscribe( resp => {
        this.juegos = resp;
        this.getSec( 1 );
        this.loading = false;
        this.numSec = Array( Math.floor((this.juegos.length / 9) + 1) );
      });
  }

  public getSec( sec: number ){
    this.panel = [];
    let ini: number;
    let fin: number;

    if ( sec > 0 ) {
      this.section = sec;
      ini = ( this.section - 1 ) * 9;
      if ( this.juegos.length < 9 * sec ){
        fin = this.juegos.length;
      }else {
        fin = this.section * 9;
      }
    } else if ( sec === 0) {
        ini = this.section  * 9;
        this.section++;
        if ( this.juegos.length <= ( this.section + 1) * 9 ) {
          fin = this.juegos.length;
        }else {
          fin = this.section * 9;
        }
    }else if (sec === -1 ) {
      this.section--;
      ini = ( this.section - 1 ) * 9;
      fin = this.section * 9;
    }

    for (let i = ini; i < fin ; i++){
      this.panel.push( this.juegos[i] );
    }
    window.scrollTo(0, 500);
  }

}
