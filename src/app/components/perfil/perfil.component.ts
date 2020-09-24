import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, ElementRef, OnInit , Renderer2, ViewChild,ViewChildren,  QueryList} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { ValidadoresService } from 'src/app/services/validadores.service';
import {UsuarioModel} from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @ViewChildren("inputP") inputs: QueryList<ElementRef>;

  msgError:string;
  patron:string = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$";
  activo:boolean=true;
  btnActivado:boolean=true;
  forma:FormGroup;
  formaImagen:FormGroup;
  usuario:UsuarioModel;
  constructor(private fb:FormBuilder,
              private validadores:ValidadoresService,
              private auth:AuthService,
              private renderer:Renderer2,
              private router:Router) { 

    this.usuario = new UsuarioModel();
    this.cargarUsuario();
    this.crearFormulario();
    this.cargarDataAlFormulario();
 
  }

  ngOnInit(): void {
    
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

  cargarUsuario(){
    
    this.usuario.correo = JSON.parse(localStorage.getItem('user')).email;
    this.usuario.nombres= JSON.parse(localStorage.getItem('user')).first_name;
    this.usuario.apellidos= JSON.parse(localStorage.getItem('user')).last_name;
    this.usuario.telefono= JSON.parse(localStorage.getItem('user')).phone_number;
    this.usuario.username= JSON.parse(localStorage.getItem('user')).username;
    this.usuario.tarjeta= JSON.parse(localStorage.getItem('user')).cliente.credit_card;
  }

  llenarDatos(){
    this.usuario.correo=this.forma.controls['correo'].value;
    this.usuario.username=this.forma.controls['username'].value;
    // this.usuario.password=this.forma.controls['password'].value;
    // this.usuario.c_password=this.forma.controls['c_password'].value;
    this.usuario.nombres=this.forma.controls['nombres'].value;
    this.usuario.apellidos=this.forma.controls['apellidos'].value;
    // if(this.forma.controls['fech_nac'].value==""){
    //   this.usuario.fech_nac=null;
    // }else {
    //   this.usuario.fech_nac=this.forma.controls['fech_nac'].value;
    // }
    if(this.forma.controls['telefono'].value==""){
      this.usuario.telefono=null;
    } else {
      this.usuario.telefono=this.forma.controls['telefono'].value;
    }

    if(this.forma.controls['tarjeta'].value==""){
      this.usuario.tarjeta=null;
    } else {
      this.usuario.tarjeta=this.forma.controls['tarjeta'].value;
    }
    
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      telefono:['',[Validators.maxLength(9),Validators.pattern("[0-9]*")]],
      username:['',[Validators.required,Validators.minLength(4)]],
      correo:['',[Validators.required,
                Validators.pattern(this.patron)]],
      tarjeta:['',Validators.maxLength(16)]
    })

    this.formaImagen = this.fb.group({
      imagen:['']
    })
  } 

  

  cargarDataAlFormulario(){
    if(this.usuario.telefono==null){
      this.usuario.telefono="";
    }
    if(this.usuario.fech_nac==null){
      this.usuario.fech_nac="";
    }
    this.forma.setValue({
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      telefono: this.usuario.telefono,
      username: this.usuario.username,
      correo: this.usuario.correo,
      tarjeta: this.usuario.tarjeta

    });
  }

  // direccionImagen(urlImagen:string){
  //   if()
  // }


  subirImagen(){
    console.log(this.formaImagen.value);
  }

  onSubmit(){
    
    if (this.forma.invalid){
      return this.forma.markAllAsTouched();
    }
    console.log(this.forma);

    this.llenarDatos();

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por Favor..'
    });
    Swal.showLoading();
    this.auth.actualizarUsuario(this.usuario,Number(localStorage.getItem('id'))).subscribe( resp => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.cargarUsuario();
      this.cargarDataAlFormulario();
      Swal.close();
      this.ReadOnly();
    }, err => {
      console.log(err);
      let emailm:Array<string> = [];
      emailm=err.error.email;
      let userm:Array<string> = [];
      userm=err.error.username;
      console.log(userm);
      console.log(emailm);
      if(emailm!=undefined && emailm.includes("ya existe este correo")){
        this.msgError="El correo ya existe, ingrese otro."
      } else if (userm!=undefined && userm.includes("A user with that username already exists.")) {
        this.msgError="El nombre de usuario ya existe, ingrese otro.";
      } 
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: this.msgError
      });
    });


    
  }



  noReadOnly(){
    console.log(this.inputs);
    this.inputs.forEach( input => {
      this.renderer.removeAttribute(input.nativeElement, "readonly");
    })
    this.btnActivado=false;
  }
  
  ReadOnly(){
    this.inputs.forEach( input => {
      this.renderer.setAttribute(input.nativeElement, "readonly", "true");
    })
    this.btnActivado=true;
    this.cargarUsuario();
    this.cargarDataAlFormulario();
  }  

}
