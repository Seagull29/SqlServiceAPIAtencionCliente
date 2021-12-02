export class Solicitud {

    #id : string;
    #encabezado : string;
    #descripcion : string;
    #estado : string;
    #fecha : Date;
    #categoria : string;
    #tipo : string;
    #estudiante : string;


    constructor(id? : string, encabezado? : string, descripcion? : string, estado? : string, fecha? : Date, categoria? : string, tipo? : string, estudiante? : string) {
        this.#id = id;
        this.#encabezado = encabezado;
        this.#descripcion = descripcion;
        this.#estado = estado;
        this.#fecha = fecha;
        this.#categoria = categoria;
        this.#tipo = tipo;
        this.#estudiante = estudiante;
    }

    get id() {
        return this.#id;
    }

    set id(id : string) {
        this.#id = id;
    }

    get encabezado() {
        return this.#encabezado;
    }

    set encabezado(encabezado : string) {
        this.#encabezado = encabezado;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(descripcion : string) {
        this.#descripcion = descripcion;
    }

    get estado() {
        return this.#estado;
    }

    set estado(estado : string) {
        this.#estado = estado;
    }

    get fecha() {
        return this.#fecha;
    }

    set fecha(fecha : Date) {
        this.#fecha = fecha;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(categoria :string) {
        this.#categoria = categoria;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(tipo :string) {
        this.#tipo = tipo;
    }

    get estudiante() {
        return this.#estudiante;
    }

    set estudiante(estudiante :string) {
        this.#estudiante = estudiante;
    }



}