import { IOperations } from "@interfaces/IOperations";
import { Reporte } from "@entities/Reporte";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class ReporteController implements IOperations<Reporte> {
    
    constructor() {}

    add = async (r : Reporte) : Promise<object | any> => {
        try {
            const {
                id,
                administrador,
                detalle,
                fecha
            } = r;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Administrador', sql.VarChar, administrador)
                                             .input('Detalle', sql.VarChar, detalle)
                                             .input('Fecha', sql.DateTime, fecha)
                                             .execute('spAgregarReporte');
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

    update = async (r : Reporte) : Promise<object | any> => {
        try {
            const {
                id,
                administrador,
                detalle,
                fecha
            } = r;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Administrador', sql.VarChar, administrador)
                                             .input('Detalle', sql.VarChar, detalle)
                                             .input('Fecha', sql.DateTime, fecha)
                                             .execute('spActualizarReporte');
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

    delete = async (r : Reporte) : Promise<object | any> => {
        try {
            const { id } = r;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarReporte');
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
            const rows = await pool.request().execute('spListarReporte');
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
                                             .execute('spBuscarReporte');
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

    report = async (startDate : Date | any, endDate : Date | any, filter : string | any) : Promise<Array<object> | any> => {
        try {
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Fechaini', sql.DateTime, startDate)
                                             .input('Fechafin', sql.DateTime, endDate)
                                             .input('Criterio', sql.VarChar, filter.charAt(0).toUpperCase().concat(filter.slice(1)))
                                             .execute('spReportes');
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

export const reporteController = new ReporteController();