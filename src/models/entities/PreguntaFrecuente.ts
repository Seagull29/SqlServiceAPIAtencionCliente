export class PreguntaFrecuente {

    #id : string;
    #administrador : string;
    #pregunta : string;
    #respuesta : string;

    constructor(id? : string, administrador? : string, pregunta? : string, respuesta? : string) {
        this.#id = id;
        this.#administrador = administrador;
        this.#pregunta = pregunta;
        this.#respuesta = respuesta;
    }

    get id() : string {
        return this.#id;
    }

    set id(id : string) {
        this.#id = id;
    }

    get administrador() : string {
        return this.#administrador;
    }

    set administrador(administrador : string) {
        this.#administrador = administrador;
    }

    get pregunta() : string {
        return this.#pregunta;
    }

    set pregunta(pregunta : string) {
        this.#pregunta = pregunta;
    }

    get respuesta() : string {
        return this.#respuesta;
    }

    set respuesta(respuesta : string) {
        this.#respuesta = respuesta;
    }

}