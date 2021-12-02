import { IOperations } from "@interfaces/IOperations";
import { Categoria } from "@entities/Categoria";
import { sqlConnection } from "@data/connection";
import * as sql from "mssql";

class CategoriaController implements IOperations<Categoria> {

    constructor() {}

    add = async (c : Categoria) : Promise<object | any> => {
        try {
            const {
                id,
                nombre,
                descripcion,
                coordinacion,
                prioridad
            } = c;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Descripcion', sql.VarChar, descripcion)
                                             .input('Coordinacion', sql.VarChar, coordinacion)
                                             .input('Prioridad', sql.VarChar, prioridad)
                                             .execute('spAgregarCategoria');
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

    update = async (c : Categoria) : Promise<object | any> => {
        try {
            const {
                id,
                nombre,
                descripcion,
                coordinacion,
                prioridad
            } = c;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .input('Nombre', sql.VarChar, nombre)
                                             .input('Descripcion', sql.VarChar, descripcion)
                                             .input('Coordinacion', sql.VarChar, coordinacion)
                                             .input('Prioridad', sql.VarChar, prioridad)
                                             .execute('spActualizarCategoria');
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

    delete = async (c : Categoria) : Promise<object | any> => {
        try {
            const { id } = c;
            const pool : sql.ConnectionPool = await sqlConnection.getConnection();
            const rows = await pool.request().input('Id', sql.VarChar, id)
                                             .execute('spEliminarCategoria');
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
            const rows = await pool.request().execute('spListarCategoria');
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
                                             .execute('spBuscarCategoria');
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

export const categoriaController = new CategoriaController();

