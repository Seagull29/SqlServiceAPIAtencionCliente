import { IOperations } from "@interfaces/IOperations";
import { Docente } from "@entities/Docente";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class DocenteController implements IOperations<Docente> {
    
    constructor() {}

    add = async (d : Docente) : Promise<object | any> => {
        try {
            const {
                codigoUAC,
                nombre,
                apellidos,
                celular
            } = d;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('CodigoUAC', sql.VarChar, codigoUAC)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spAgregarDocente');
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

    update = async (d : Docente) : Promise<object | any> => {
        try {
            const {
                codigoUAC,
                nombre,
                apellidos,
                celular
            } = d;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('CodigoUAC', sql.VarChar, codigoUAC)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spActualizarDocente');
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

    delete = async (e : Docente) : Promise<object | any> => {
        try {
            const { codigoUAC } = e;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('CodigoUAC', sql.VarChar, codigoUAC)
                                             .execute('spEliminarDocente');
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
            const rows = await pool.request().execute('spListarDocente');
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
                                             .execute('spBuscarDocente');
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

export const docenteController = new DocenteController();