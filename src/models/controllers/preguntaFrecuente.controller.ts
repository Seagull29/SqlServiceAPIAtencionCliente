import { IOperations } from "@interfaces/IOperations";
import { PreguntaFrecuente } from "@entities/PreguntaFrecuente";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class PreguntaFrecuenteController implements IOperations<PreguntaFrecuente> {
    
    constructor() {}

    add = async (pf : PreguntaFrecuente) : Promise<object | any> => {
        try {
            const {
                id,
                administrador,
                pregunta,
                respuesta
            } = pf;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Administrador', sql.VarChar, administrador)
                                             .input('Pregunta', sql.VarChar, pregunta)
                                             .input('Respuesta', sql.VarChar, respuesta)
                                             .execute('spAgregarPreguntaFrecuente');
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

    update = async (pf : PreguntaFrecuente) : Promise<object | any> => {
        try {
            const {
                id,
                administrador,
                pregunta,
                respuesta
            } = pf;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Administrador', sql.VarChar, administrador)
                                             .input('Pregunta', sql.VarChar, pregunta)
                                             .input('Respuesta', sql.VarChar, respuesta)
                                             .execute('spActualizarPreguntaFrecuente');
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

    delete = async (pf : PreguntaFrecuente) : Promise<object | any> => {
        try {
            const { id } = pf;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarPreguntaFrecuente');
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
            const rows = await pool.request().execute('spListarPreguntaFrecuente');
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
                                             .execute('spBuscarPreguntaFrecuente');
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

export const preguntaFrecuenteController = new PreguntaFrecuenteController();