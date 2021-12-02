import { IOperations } from "@interfaces/IOperations";
import { Secretaria } from "@entities/Secretaria";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class SecretariaController implements IOperations<Secretaria> {
    
    constructor() {}

    add = async (d : Secretaria) : Promise<object | any> => {
        try {
            const {
                dni,
                nombre,
                apellidos,
                celular
            } = d;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('DNI', sql.VarChar, dni)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spAgregarSecretaria');
            const { 
                CodError : error,
                Mensaje : mensaje 
            } = rows.recordset[0];
            
            if (error) {
                throw new Error(`Exception with code ${error}. ${mensaje}`);
            }
            pool.close();
            return {
                status: error,
                mensaje: mensaje
            };
        } catch (error) {
            return {
                status: 1,
                errorMessage: error.message
            };
        }
    }

    update = async (d : Secretaria) : Promise<object | any> => {
        try {
            const {
                dni,
                nombre,
                apellidos,
                celular
            } = d;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('DNI', sql.VarChar, dni)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spActualizarSecretaria');
            const { 
                CodError : error,
                Mensaje : mensaje 
            } = rows.recordset[0];
            
            if (error) {
                throw new Error(`Exception with code ${error}. ${mensaje}`);
            }
            pool.close();
            return {
                status: error,
                mensaje: mensaje
            };
        } catch (error) {
            return {
                status: 1,
                errorMessage: error.message
            };
        }
    }

    delete = async (e : Secretaria) : Promise<object | any> => {
        try {
            const { dni } = e;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('DNI', sql.VarChar, dni)
                                             .execute('spEliminarSecretaria');
            const { CodError : error, Mensaje : mensaje } = rows.recordset[0];
            if (error) {
                throw new Error(`Exception with code ${error}. ${mensaje}`);
            }
            pool.close();
            return {
                status: error,
                mensaje: mensaje
            };
        } catch (error) {
            return {
                status: 1,
                errorMessage: error.message
            };
        }
    }

    list = async () : Promise<Array<object> | any> => {
        try {
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().execute('spListarSecretaria');
            pool.close();
            return rows.recordset;
        } catch (error) {
            console.log(error);
        }
        
    }

    search = async (query : string | any, filter : string | any) : Promise<Array<object> | any> => {
        try {
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Busqueda', sql.VarChar, query)
                                             .input('Criterio', sql.VarChar, filter.charAt(0).toUpperCase().concat(filter.slice(1)))
                                             .execute('spBuscarSecretaria');
            pool.close();
            if (!rows.recordset) {
                return [];
            }
            return rows.recordset;
        } catch (error) {
            return {
                error: 'Wrong query parameter has been sent'
            }
        }
    }
}

export const secretariaController = new SecretariaController();