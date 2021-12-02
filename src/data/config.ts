import * as sql from "mssql";
import * as dotenv from "dotenv";

dotenv.config();

export const dbConfig : sql.config = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        instanceName: 'SQLEXPRESS',
        trustServerCertificate: true
    }
};

export const storedProcedures = {

};
