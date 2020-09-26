import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JuegoModel } from 'src/app/models/juego';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logeado:boolean;
  username:string;
  juegos:JuegoModel[]=[];
  constructor(private auth:AuthService,
    private juegosService: JuegoService) {
      this.juegos=juegosService.getCarros();
    if(localStorage.getItem('token')){
      this.logeado=true;
    }else {
      this.logeado=false;
    }
  }
    


    ngOnInit(): void {
    setTimeout(() => {
      if(localStorage.getItem('user')){
        this.username=JSON.parse(localStorage.getItem('user')).username;
      }
    },500)
    
    console.log(this.logeado);
  }

  salir(){
    this.auth.logout();
  }
  
}
