import { IOperations } from "@interfaces/IOperations";
import { Tipo } from "@entities/Tipo";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class TipoController implements IOperations<Tipo> {
    
    constructor() {}

    add = async (t : Tipo) : Promise<object | any> => {
        try {
            const {
                id,
                nombre,
                prioridad
            } = t;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Prioridad', sql.VarChar, prioridad)
                                             .execute('spAgregarTipo');
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

    update = async (t : Tipo) : Promise<object | any> => {
        try {
            const {
                id,
                nombre,
                prioridad
            } = t;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Prioridad', sql.VarChar, prioridad)
                                             .execute('spActualizarTipo');
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

    delete = async (t : Tipo) : Promise<object | any> => {
        try {
            const { id } = t;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarTipo');
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
            const rows = await pool.request().execute('spListarTipo');
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
                                             .execute('spBuscarTipo');
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

export const tipoController = new TipoController();