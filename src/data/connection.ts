import * as sql from "mssql";
import { dbConfig } from "@data/config";

class SqlConnection {

    #config : any;

    static #instance : SqlConnection;

    constructor(config? : any) {

        if (SqlConnection.#instance) {
            return SqlConnection.#instance;
        }
        SqlConnection.#instance = this;
        this.#config ??= config;
        
    }

    async getConnection() : Promise<sql.ConnectionPool | never> {
        try { 
            const connection = await sql.connect(this.#config);
            return connection;
        } catch (err) {
            console.log(err);
        }
    }

}

export const sqlConnection = new SqlConnection(dbConfig);

