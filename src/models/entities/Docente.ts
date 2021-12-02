import { Usuario } from "@entities/Usuario";

export class Docente extends Usuario {

    #codigoUAC : string;
    
    constructor(codigoUAC? : string, nombre? : string, apellidos? : string, celular? : string) {
        super(nombre, apellidos, celular);
        this.#codigoUAC = codigoUAC;
    }

    get codigoUAC() : string {
        return this.#codigoUAC;
    }

    set codigoUAC(codigo : string) {
        this.#codigoUAC = codigo;
    }

}