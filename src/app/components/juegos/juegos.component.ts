import { Component, OnInit } from '@angular/core';

import { JuegoModel } from 'src/app/models/juego';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  juegos: JuegoModel[] = [];
  loading = false;
  genero: number;
  precio = 0;
  section: number;

  constructor( private juegoService: JuegoService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.juegoService.getAll( 0, '1')
      .subscribe( resp => {
        this.juegos = resp;
        this.loading = false;
      });
    this.section = 0;
    this.genero = 0;
  }

  public getSec( sect: number){
    if ( sect !== -1){
      this.section = sect;
    }else {
      this.section++;
    }
    this.juegoService.getAll( this.genero, (5 * this.section + 1 ) + '' )
      .subscribe( resp => {
        this.juegos = resp;
        window.scrollTo(0, 0);
      });
  }

}
