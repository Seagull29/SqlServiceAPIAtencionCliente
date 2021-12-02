
export class Tipo {

    #id : string;
    #nombre : string;
    #prioridad : string;

    constructor(id? : string, nombre? : string, prioridad? : string) {
        this.#id = id;
        this.#nombre = nombre;
        this.#prioridad = prioridad;
    }


    get id() : string {
        return this.#id;
    }

    set id(id : string) {
        this.#id = id;
    }

    get nombre() : string {
        return this.#nombre;
    }

    set nombre(nombre : string) {
        this.#nombre = nombre;
    }

    get prioridad() : string {
        return this.#prioridad;
    }

    set prioridad(prioridad : string) {
        this.#prioridad = prioridad;
    }


}