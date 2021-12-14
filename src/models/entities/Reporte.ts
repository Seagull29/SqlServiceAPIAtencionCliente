export class Reporte {

    #id : string;
    #administrador : string;
    #detalle : string;
    #fecha : Date;

    constructor(id? : string, administrador? : string, detalle? : string, fecha? : Date) {
        this.#id = id;
        this.#administrador = administrador;
        this.#detalle = detalle;
        this.#fecha = fecha;
    }

    get id() : string {
        return this.#id
    }

    set id(id : string) {
        this.#id = id;
    }

    get administrador() : string {
        return this.#administrador;
    }

    set administrador(administrador: string) {
        this.#administrador = administrador;
    }

    get detalle() : string {
        return this.#detalle;
    }

    set detalle(detalle: string) {
        this.#detalle = detalle;
    }

    get fecha() : Date {
        return this.#fecha;
    }

    set fecha(fecha : Date) {
        this.#fecha = fecha;
    }

}