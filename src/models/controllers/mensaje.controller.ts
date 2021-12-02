import { IOperations } from "@interfaces/IOperations";
import { Mensaje } from "@entities/Mensaje";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class MensajeController implements IOperations<Mensaje> {
    
    constructor() {}

    add = async (m : Mensaje) : Promise<object | any> => {
        try {
            const {
                id,
                cuerpo,
                fecha,
                solicitud,
                estudiante,
                docente,
                administrador,
                secretaria
            } = m;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Cuerpo', sql.VarChar, cuerpo)
                                             .input('Fecha', sql.DateTime, fecha)
                                             .input('Solicitud', sql.VarChar, solicitud)
                                             .input('Estudiante', sql.VarChar, estudiante)
                                             .input('Docente', sql.VarChar, docente)
                                             .input('Administrador', sql.VarChar, administrador)
                                             .input('Secretaria', sql.VarChar, secretaria)
                                             .execute('spAgregarMensaje');
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

    update = async (m : Mensaje) : Promise<object | any> => {
        try {
            const {
                id,
                cuerpo,
                fecha,
                solicitud,
                estudiante,
                docente,
                administrador,
                secretaria
            } = m;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Cuerpo', sql.VarChar, cuerpo)
                                             .input('Fecha', sql.DateTime, fecha)
                                             .input('Solicitud', sql.VarChar, solicitud)
                                             .input('Estudiante', sql.VarChar, estudiante)
                                             .input('Docente', sql.VarChar, docente)
                                             .input('Administrador', sql.VarChar, administrador)
                                             .input('Secretaria', sql.VarChar, secretaria)
                                             .execute('spActualizarMensaje');
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

    delete = async (m : Mensaje) : Promise<object | any> => {
        try {
            const { id } = m;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarMensaje');
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
            const rows = await pool.request().execute('spListarMensaje');
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
                                             .execute('spBuscarMensaje');
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

export const mensajeController = new MensajeController();