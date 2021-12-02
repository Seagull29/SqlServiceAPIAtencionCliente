import { Usuario } from "@entities/Usuario";

export class Administrador extends Usuario {

    #dni : string;

    constructor(dni? : string, nombre? : string, apellidos? : string, celular? : string) {
        super(nombre, apellidos, celular);
        this.#dni = dni;
    }

    get dni() : string {
        return this.#dni;
    }

    set dni(dni : string) {
        this.#dni = dni;
    }


}