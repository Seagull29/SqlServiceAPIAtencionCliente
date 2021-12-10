import { Usuario } from "@entities/Usuario"

export class Secretaria extends Usuario {

    #identificacion : string;
    constructor(identificacion? : string, nombre? : string, apellidos? : string, celular? : string) {
        super(nombre, apellidos, celular);
        this.#identificacion = identificacion;
    }

    get identificacion() : string {
        return this.#identificacion;
    }

    set identificacion(identificacion : string) {
        this.#identificacion = identificacion;
    }

}