import { IOperations } from "@interfaces/IOperations";
import { Solicitud } from "@entities/Solicitud";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class SolicitudController implements IOperations<Solicitud> {

    add = async (s: Solicitud) : Promise<object | any> => {
        try {
            const {
                id,
                encabezado,
                descripcion,
                estado,
                fecha,
                categoria,
                tipo,
                estudiante
            } = s;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Encabezado', sql.VarChar, encabezado)
                                             .input('Descripcion', sql.VarChar, descripcion)
                                             .input('Estado', sql.VarChar, estado)
                                             .input('Fecha', sql.DateTime, fecha)
                                             .input('Categoria', sql.VarChar, categoria)
                                             .input('Tipo', sql.VarChar, tipo)
                                             .input('Estudiante', sql.VarChar, estudiante)
                                             .execute('spAgregarSolicitud');
            const { 
                CodError : error,
                Mensaje : mensaje 
            } = rows.recordset[0];
            
            if (error) {
                throw new Error(`Exception with code ${error}. ${mensaje}`);
            }
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

    update = async (s : Solicitud) : Promise<object | any> => {
        try {
            const {
                id,
                encabezado,
                descripcion,
                estado,
                fecha,
                categoria,
                tipo,
                estudiante
            } = s;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Encabezado', sql.VarChar, encabezado)
                                             .input('Descripcion', sql.VarChar, descripcion)
                                             .input('Estado', sql.VarChar, estado)
                                             .input('Fecha', sql.DateTime, fecha)
                                             .input('Categoria', sql.VarChar, categoria)
                                             .input('Tipo', sql.VarChar, tipo)
                                             .input('Estudiante', sql.VarChar, estudiante)
                                             .execute('spActualizarSolicitud');
            const { 
                CodError : error,
                Mensaje : mensaje 
            } = rows.recordset[0];
            
            if (error) {
                throw new Error(`Exception with code ${error}. ${mensaje}`);
            }
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

    delete = async (s : Solicitud) : Promise<object | any> => {
        try {
            const { id } = s;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarSolicitud');
            const { CodError : error, Mensaje : mensaje } = rows.recordset[0];
            if (error) {
                throw new Error(`Exception with code ${error}. ${mensaje}`);
            }
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
            const rows = await pool.request().execute('spListarSolicitud');
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
                                             .execute('spBuscarSolicitud');
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

export const solicitudController = new SolicitudController();