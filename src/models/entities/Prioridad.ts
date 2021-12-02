
export class Prioridad {

    #id : string;
    #nombre : string;
    #nivel : number;

    constructor(id? : string, nombre? : string, nivel? : number) {
        this.#id = id;
        this.#nombre = nombre;
        this.#nivel = nivel;
    }

    get id() : string {
        return this.#id;
    }

    set id(val : string) {
        this.#id = val;
    }

    get nombre() : string {
        return this.#nombre;
    }

    set nombre(val : string) {
        this.#nombre = val;
    }

    get nivel() : number {
        return this.#nivel;
    }

    set nivel(val : number) {
        this.#nivel = val;
    }

}