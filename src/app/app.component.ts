import { Component } from '@angular/core';
import { JuegoModel } from './models/juego';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IHCproject';
  jsCarro:JuegoModel[]=[];
  constructor(){
  }
  ajCarro(e:JuegoModel[]){
    this.jsCarro=e;
    console.log(this.jsCarro[0].id_juego);
  }
}
