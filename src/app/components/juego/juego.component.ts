import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { ActivatedRoute } from '@angular/router';
import { JuegoDetailModel } from 'src/app/models/juegoDetail';
import { JuegoModel } from 'src/app/models/juego';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  juegos: JuegoModel[];
  juego: JuegoDetailModel = new JuegoDetailModel();
  con: number;
  loading = false;
  cant = 1;
  id:Number;
  constructor( private juegoService: JuegoService, private router: ActivatedRoute) {
    this.juegos=this.juegoService.getAll();
   }

  ngOnInit(): void {
    this.loading = true;
    const param: number[] = this.router.snapshot.paramMap.get('id')
    .split('-')
    .map( item => Number(item));
    if ( param[0] !== 0 ) {
      this.juegoService.getOne( param[0] )
        .subscribe( (resp: any) => {
          this.juego = resp;
          this.id=Number(param[0]);
          this.selectConsole(param[1]);
          this.loading = false;
        });
    }
  }
  public aCarro(id,con){
    if(this.juegoService.jsCarros.length!=0){
    for(let i=0;i<this.juegos.length;i++){
      if((this.juegos[i].id_juego==id)&&(this.juegos[i].id_consola==con)){
        this.juegoService.jsCarros.push(this.juegos[i]);
        alert('Existe');
    }
    console.log('No existe?');
  }
}
  }

  private selectConsole(pos: number){
    let inter = true;
    this.juego.consoles.forEach((item, index) => {
      if (item.console === pos && inter){
        this.con = index;
        inter = false;
      }
    });
  }

  public changeCant( op: number ){
    if (op === 1){
      if ( this.cant > 1 ) {
        this.cant--;
      }
    }else {
      this.cant++;
    }
  }

}
