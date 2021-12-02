import { IOperations } from "@interfaces/IOperations";
import { Estudiante } from "@entities/Estudiante";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class EstudianteController implements IOperations<Estudiante> {

    //readonly #sql : SqlConnection = new SqlConnection(config);    
    constructor() {}

    add = async (e: Estudiante) : Promise<object | any> => {
        try {
            const {
                codigoUAC,
                nombre,
                apellidos,
                grado,
                celular
            } = e;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('CodigoUAC', sql.VarChar, codigoUAC)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Grado', sql.VarChar, grado)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spAgregarEstudiante');
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

    update = async (e : Estudiante) : Promise<object | any> => {
        try {
            const {
                codigoUAC,
                nombre,
                apellidos,
                grado,
                celular
            } = e;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('CodigoUAC', sql.VarChar, codigoUAC)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Grado', sql.VarChar, grado)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spActualizarEstudiante');
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

    delete = async (e : Estudiante) : Promise<object | any> => {
        try {
            const { codigoUAC } = e;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('CodigoUAC', sql.VarChar, codigoUAC)
                                             .execute('spEliminarEstudiante');
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
            const rows = await pool.request().execute('spListarEstudiante');
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
                                             .execute('spBuscarEstudiante');
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

export const estudianteController = new EstudianteController();
