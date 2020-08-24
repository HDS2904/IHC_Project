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

  constructor( private juegoService: JuegoService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.juegoService.getAll()
      .subscribe( resp => {
        this.juegos = resp;
        this.loading = false;
      });
  }

}
