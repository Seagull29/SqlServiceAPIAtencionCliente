import { IOperations } from "@interfaces/IOperations";
import { Administrador } from "@entities/Administrador";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class AdministradorController implements IOperations<Administrador> {
    
    constructor() {}

    add = async (a : Administrador) : Promise<object | any> => {
        try {
            const {
                identificacion,
                nombre,
                apellidos,
                celular
            } = a;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Identificacion', sql.VarChar, identificacion)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spAgregarAdministrador');
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

    update = async (a : Administrador) : Promise<object | any> => {
        try {
            const {
                identificacion,
                nombre,
                apellidos,
                celular
            } = a;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Identificacion', sql.VarChar, identificacion)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Apellidos', sql.VarChar, apellidos)
                                             .input('Celular', sql.VarChar, celular)
                                             .execute('spActualizarAdministrador');
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

    delete = async (a : Administrador) : Promise<object | any> => {
        try {
            const { identificacion } = a;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Identificacion', sql.VarChar, identificacion)
                                             .execute('spEliminarAdministrador');
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
            const rows = await pool.request().execute('spListarAdministrador');
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
                                             .execute('spBuscarAdministrador');
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

export const administradorController = new AdministradorController();