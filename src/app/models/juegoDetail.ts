
class Consoles {
    console: number;
    price: number;
    stock: number;
    picture: string;

    constructor() {}
}


export class JuegoDetailModel {
    id: number;
    genders: number[];
    consoles: Consoles[];
    name: string;
    description: string;
    release_day: string;

    constructor() {

    }
}