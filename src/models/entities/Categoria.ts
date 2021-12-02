
export class Categoria {

    #id : string;
    #nombre : string;
    #descripcion : string;
    #coordinacion : string;
    #prioridad : string;

    constructor(id? : string, nombre? : string, descripcion? : string, coordinacion? : string, prioridad? : string) {
        this.#id = id;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#coordinacion = coordinacion;
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

    get descripcion() : string {
        return this.#descripcion;
    }

    set descripcion(descripcion : string) {
        this.#descripcion = descripcion;
    }

    get coordinacion() : string {
        return this.#coordinacion;
    }

    set coordinacion(coordinacion : string) {
        this.#coordinacion = coordinacion;
    }

    get prioridad() : string {
        return this.#prioridad;
    }

    set prioridad(prioridad : string) {
        this.#prioridad = prioridad;
    }

}