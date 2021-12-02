import { IOperations } from "@interfaces/IOperations";
import { Multimedia } from "@entities/Multimedia";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class MultimediaController implements IOperations<Multimedia> {
    
    constructor() {}

    add = async (m : Multimedia) : Promise<object | any> => {
        try {
            const {
                id,
                nombre,
                extension,
                archivo,
                mensaje,
                solicitud
            } = m;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Extension', sql.VarChar, extension)
                                             .input('Archivo', sql.VarBinary(sql.MAX), archivo)
                                             .input('Mensaje', sql.VarChar, mensaje)
                                             .input('Solicitud', sql.VarChar, solicitud)
                                             .execute('spAgregarMultimedia');
            const { 
                CodError : error,
                Mensaje : mens 
            } = rows.recordset[0];
            
            if (error) {
                throw new Error(`Exception with code ${error}. ${mens}`);
            }
            return {
                status: error,
                mensaje: mens
            };
        } catch (error) {
            return {
                status: 1,
                errorMessage: error.message
            };
        }
    }

    update = async (m : Multimedia) : Promise<object | any> => {
        try {
            const {
                id,
                nombre,
                extension,
                archivo,
                mensaje,
                solicitud
            } = m;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Extension', sql.VarChar, extension)
                                             .input('Archivo', sql.VarBinary(sql.MAX), archivo)
                                             .input('Mensaje', sql.VarChar, mensaje)
                                             .input('Solicitud', sql.VarChar, solicitud)
                                             .execute('spActualizarMultimedia');
            const { 
                CodError : error,
                Mensaje : mens 
            } = rows.recordset[0];
            
            if (error) {
                throw new Error(`Exception with code ${error}. ${mens}`);
            }
            pool.close();
            return {
                status: error,
                mensaje: mens
            };
        } catch (error) {
            return {
                status: 1,
                errorMessage: error.message
            };
        }
    }

    delete = async (m : Multimedia) : Promise<object | any> => {
        try {
            const { id } = m;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarMultimedia');
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
            const rows = await pool.request().execute('spListarMultimedia');
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
                                             .execute('spBuscarMultimedia');
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

export const multimediaController = new MultimediaController();