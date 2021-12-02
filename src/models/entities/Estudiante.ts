import { Usuario } from "@entities/Usuario";

class Estudiante extends Usuario {

    #codigoUAC : string;
    #grado : string;

    constructor(codigoUAC? : string, nombre? : string, apellidos? : string, grado? : string, celular? : string) {
        super(nombre, apellidos, celular);
        this.#codigoUAC = codigoUAC;
        this.#grado = grado;
    }

    get codigoUAC() : string {
        return this.#codigoUAC;
    }

    set codigoUAC(value: string) {
        this.#codigoUAC = value;
    }

    get grado() : string {
        return this.#grado;
    }

    set grado(value : string) {
        this.#grado = value;
    }


}


export { Estudiante };