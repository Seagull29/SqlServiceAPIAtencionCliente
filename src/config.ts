import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 3000
};

export const endpoints = {
    estudiantes: '/api/estudiantes',
    docentes: '/api/docentes',
    secretarias: '/api/secretarias',
    administradores: '/api/administradores',
    prioridades: '/api/prioridades',
    categorias: '/api/categorias',
    coordinaciones: '/api/coordinaciones',
    tipos: '/api/tipos',
    solicitudes: '/api/solicitudes',
    multimedia: '/api/multimedia',
    mensajes: '/api/mensajes',
    preguntasFrecuentes: '/api/preguntasFrecuentes', 
    reportes: '/api/reportes'
};
