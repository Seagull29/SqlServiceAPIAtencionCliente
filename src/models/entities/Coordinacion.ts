
export class Coordinacion {

    #id : string;
    #nombre : string;
    #docente : string;

    constructor(id? : string, nombre? : string, docente? : string) {
        this.#id = id;
        this.#nombre = nombre;
        this.#docente = docente;
    }

    get id() : string {
        return this.#id;
    }

    set id(value: string) {
        this.#id = value;
    }

    get nombre() : string {
        return this.#nombre;
    }

    set nombre(value: string) {
        this.#nombre = value;
    }

    get docente() : string {
        return this.#docente;
    }

    set docente(value: string) {
        this.#docente = value;
    }

}