import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidadoresService } from 'src/app/services/validadores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  constructor(private router: Router ) { 
  }

  ngOnInit(): void {
  }
  accion(){
    Swal.fire({
      icon: 'info',
      title: 'Pedido Realizado',
      text: 'Entrega a realizarse en 48 horas'
    });
    this.router.navigate(['/home']);

  }

}
