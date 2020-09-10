import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { ActivatedRoute } from '@angular/router';
import { JuegoDetailModel } from 'src/app/models/juegoDetail';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  juego: JuegoDetailModel = new JuegoDetailModel();
  con: number;
  loading = false;
  cant = 1;

  constructor( private juegoService: JuegoService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    const param: number[] = this.router.snapshot.paramMap.get('id')
    .split('-')
    .map( item => Number(item));
    if ( param[0] !== 0 ) {
      this.juegoService.getOne( param[0] )
        .subscribe( (resp: any) => {
          this.juego = resp;
          this.selectConsole(param[1]);
          this.loading = false;
        });
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
