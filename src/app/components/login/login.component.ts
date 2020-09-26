import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { VirtualTimeScheduler } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  patron:string = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$";
  
  usuario:UsuarioModel;
  exito:boolean;
  msgError:string;
  forma:FormGroup;
  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private router:Router,
              private juegos:JuegoService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();

  }

  

  formInvalido(f:string){
    return this.forma.get(f).invalid && this.forma.get(f).touched;
  }

  requiereValor(f:string){
    return this.formInvalido(f) && this.forma.controls[f].errors['required']
  }

  patronCorreoInvalido(){
    return this.formInvalido('correo') && this.forma.controls['correo'].errors['pattern'];
  }

  minlengthInvalido(f:string){
    return this.formInvalido(f) && this.forma.controls[f].errors['minlength'];
  }

  crearFormulario(){
    this.forma = this.fb.group({
      correo:['',[Validators.required,
                Validators.pattern(this.patron)]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
  }

  llenarDatos(){
    this.usuario.correo=this.forma.controls['correo'].value;
    this.usuario.password=this.forma.controls['password'].value;
  }

  onSubmit(){
    
    if (this.forma.invalid){
      return this.forma.markAllAsTouched();
    }
    this.llenarDatos();

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por Favor..'
    });
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(resp => {
      this.exito=true;
      console.log(resp);
      Swal.close();
      this.router.navigate(['/home']);
      this.juegos.logeado=1;
    }, err => {
      this.exito=false
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: 'La cuenta no existe o datos incorrectos.'
      });
    });

  }

}
