
export abstract class Usuario {

    #nombre: string;
    #apellidos: string;
    #celular: string;

    constructor(nombre? : string, apellidos? : string, celular? : string) {
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#celular = celular;
    }

    get nombre() : string { 
        return this.#nombre; 
    }

    set nombre(value : string) { 
        this.#nombre = value 
    }

    get apellidos() : string { 
        return this.#apellidos; 
    }

    set apellidos(value : string) { 
        this.#apellidos = value; 
    }

    get celular() : string {
        return this.#celular;
    }

    set celular(value : string) { 
        this.#celular = value 
    }

}