export class Mensaje {

    #id : string;
    #fecha : Date;
    #cuerpo : string;
    #solicitud : string;
    #estudiante: string;
    #docente : string;
    #secretaria : string;
    #administrador : string;

    constructor(id? : string, cuerpo? : string, fecha? : Date, solicitud? : string, estudiante? : string, docente? : string, administrador? : string, secretaria? : string) {
        this.#id = id;
        this.#cuerpo = cuerpo;
        this.#fecha = fecha;
        this.#solicitud = solicitud;
        this.#estudiante = estudiante;
        this.#docente = docente;
        this.#administrador = administrador;
        this.#secretaria = secretaria;
    }

    get id() {
        return this.#id;
    }

    set id(id : string) {
        this.#id = id;
    }

    get cuerpo() {
        return this.#cuerpo;
    }

    set cuerpo(cuerpo : string) {
        this.#cuerpo = cuerpo;
    }

    get fecha() {
        return this.#fecha;
    }

    set fecha(fecha : Date) {
        this.#fecha = fecha;
    }

    get solicitud() {
        return this.#solicitud;
    }

    set solicitud(solicitud : string) {
        this.#solicitud = solicitud;
    }

    get estudiante() {
        return this.#estudiante;
    }

    set estudiante(estudiante : string) {
        this.#estudiante = estudiante;
    }

    get docente() {
        return this.#docente;
    }

    set docente(docente : string) {
        this.#docente = docente;
    }

    get secretaria() {
        return this.#secretaria;
    }

    set secretaria(secretaria : string) {
        this.#secretaria = secretaria;
    }

    get administrador() {
        return this.#administrador;
    }

    set administrador(administrador : string) {
        this.#administrador = administrador;
    }

}