export class Multimedia {
    
    #id : string;
    #nombre : string;
    #extension : string;
    #archivo : Buffer;
    #mensaje: string;
    #solicitud : string;

    constructor(id? : string, nombre? : string, extension? : string, archivo? : Buffer, mensaje? : string, solicitud? : string) {
        this.#id = id;
        this.#nombre = nombre;
        this.#extension = extension;
        this.#archivo = archivo;
        this.#mensaje = mensaje;
        this.#solicitud = solicitud;
    }

    get id() {
        return this.#id;
    }

    set id(id : string) {
        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre : string) {
        this.#nombre = nombre;
    }

    get extension() {
        return this.#extension;
    }

    set extension(ext : string) {
        this.#extension = ext;
    }

    get archivo() {
        return this.#archivo;
    }

    set archivo(archivo : Buffer) {
        this.#archivo = archivo;
    }

    get mensaje() {
        return this.#mensaje;
    }

    set mensaje(mensaje : string) {
        this.#mensaje = mensaje;
    }

    get solicitud() {
        return this.#solicitud;
    }

    set solicitud(solicitud : string) {
        this.#solicitud = solicitud;
    }

}