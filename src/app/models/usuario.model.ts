export class UsuarioModel {
    id:number;
    nombres:string;
    apellidos:string;
    telefono:string;
    fech_nac:string;
    username:string;
    correo:string;
    password:string;
    c_password:string;
    is_active:boolean;
    imagen:string;
    tarjeta:string;
    saldo:number;

    constructor (){
        this.is_active=null;
        this.tarjeta=null;
        this.saldo=null;
        this.fech_nac=null;
        this.telefono=null;
    }
}