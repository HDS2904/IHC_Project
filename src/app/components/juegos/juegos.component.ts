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
  valor=true;
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
    let encontrado=true;
    if(this.juegoService.jsCarros.length==0){
      item.cantidad=1;
      item.unico=true;
      this.juegoService.jsCarros.push(item);
      alert("Añadido al carro");
    }
    else{
      for(let i=0;i<this.juegoService.jsCarros.length;i++){
        if(item.id_juego==this.juegoService.jsCarros[i].id_juego){
          encontrado=false;
        }
        
      }
      if(encontrado){
        item.cantidad=1;
        item.unico=true;
        this.juegoService.jsCarros.push(item);
          alert("Añadido al carro");
      }
      else{
        alert("Ya esta en el carro");
      }
    }
  
    //this.aCarro.emit(this.juegosCarro);
  }
  public verifica(juego: JuegoModel){
    this.valor==true;
    for(let i=0;i<this.juegoService.jsCarros.length;i++){
      if((this.juegoService.jsCarros[i].id_juego==juego.id_juego)&&(this.juegoService.jsCarros[i].almacen.console===juego.almacen.console)){
        this.valor=false;
      }
    }
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
