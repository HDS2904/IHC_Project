import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoModel } from 'src/app/models/juego';
import { JuegoService } from 'src/app/services/juego.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit,OnChanges {

  //@Input('entrada') juegosCarros:JuegoModel[]=[];
  juegos:JuegoModel[]=[];
  loading = false;
  panel: JuegoModel[] = [];
  logeado:number;
  preciototal:number=0;
  genero: number;
  precio = 0;
  section: number;
  numSec: number[] = [];

constructor( private juegoService: JuegoService, private router:Router){
  this.logeado=this.juegoService.logeado;
  this.juegos=juegoService.getCarros();
 }
  ngOnInit(){
    this.loading = true;
    this.getSec( 1 );
    this.loading = false;
    this.numSec = Array( Math.floor((this.juegos.length / 9) + 1) );
    this.section = 0;
    this.genero = 0;
    this.logeado=this.juegoService.logeado;
    this.precioTotal();
  }
  ngOnChanges(changes: SimpleChanges){
    this.logeado=this.juegoService.logeado;
    this.loading = true;
    this.getSec( 1 );
    this.loading = false;
    this.numSec = Array( Math.floor((this.juegos.length / 9) + 1) );
    this.section = 0;
    this.genero = 0;
    this.precioTotal();
  }
  public deleteJuegoCarro(juego){
    for(let i=0;i<this.panel.length;i++){
     if(juego==this.panel[i].id_juego){
       this.panel.splice(i,1);
       this.juegos.splice(i,1);
       this.juegoService.jsCarros.splice(i,1);
     } 
    }
  }
  public precioTotal(){
    this.preciototal=0;
    for(let i=0;i<this.juegos.length;i++){
      this.preciototal+=this.juegos[i].almacen.price;
    }
  }
  public rediCompra(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Usuario detectado..'
    });
      this.router.navigate(['/compra']);
  }
  public rediLogin(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Ingrese por favor..'
    });
      this.router.navigate(['/login']);
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
