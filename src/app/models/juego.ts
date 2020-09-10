
class Almacen {
    console: number;
    price: number;
    stock: number;
    picture: string;

    constructor() {}
}


export class JuegoModel {
    id_juego: number;
    id_consola: number;
    nombre: string;
    generos: number[];
    almacen: Almacen;

    constructor() {

    }
}
