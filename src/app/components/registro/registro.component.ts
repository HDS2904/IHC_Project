import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioModel} from '../../models/usuario.model';
import {ValidadoresService} from '../../services/validadores.service';
import {AuthService} from '../../services/auth.service';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  patron:string = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$";
  usuario:UsuarioModel;
  forma:FormGroup
  msgError:string;
  constructor(private fb:FormBuilder,
              private validadores:ValidadoresService,
              private router:Router,
              private auth:AuthService) {
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

  maxlengthInvalido(f:string){
    return this.formInvalido(f) && this.forma.controls[f].errors['maxlength'];
  }

  soloNumeros(){
    return this.formInvalido('telefono') && this.forma.controls['telefono'].errors['pattern'];
  }

  confirmarPassword(){
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('c_password').value;
    
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      telefono:['',[Validators.maxLength(9),Validators.pattern("[0-9]*")]],
      fech_nac:[''],
      username:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      correo:['',[Validators.required,
                Validators.pattern(this.patron)]],
      password:['',[Validators.required,Validators.minLength(8)]],
      c_password:['']
    },{
      validators:this.validadores.passwordsIguales('password','c_password')
    }
    )
  }

  llenarDatos(){
    this.usuario.correo=this.forma.controls['correo'].value;
    this.usuario.username=this.forma.controls['username'].value;
    this.usuario.password=this.forma.controls['password'].value;
    this.usuario.c_password=this.forma.controls['c_password'].value;
    this.usuario.nombres=this.forma.controls['nombres'].value;
    this.usuario.apellidos=this.forma.controls['apellidos'].value;
    if(this.forma.controls['fech_nac'].value==""){
      this.usuario.fech_nac=null;
    }else {
      this.usuario.fech_nac=this.forma.controls['fech_nac'].value;
    }
    if(this.forma.controls['telefono'].value==""){
      this.usuario.telefono=null;
    } else {
      this.usuario.telefono=this.forma.controls['telefono'].value;
    }
    
  }

  onSubmit(){
    console.log(this.forma);
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
    this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      if(err.error.non_field_errors){
        this.msgError="Contraseña muy comun, registre otra."
      } else if (err.error.email) {
        this.msgError="El correo ya existe.";
      } else if (err.error.username) {
        this.msgError="El username ya existe.";
      }
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: this.msgError
      });
    });
    
    

  }

}
