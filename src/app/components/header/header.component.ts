import { Component, OnInit } from '@angular/core';
import { JuegoModel } from 'src/app/models/juego';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  juegos:JuegoModel[]=[];
  constructor(private juegosService: JuegoService) { 
    this.juegos=juegosService.getCarros();
  }

  ngOnInit(): void {
  }

}
