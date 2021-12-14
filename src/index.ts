import 'module-alias/register';
import express, { Application } from "express";
import { config, endpoints } from "./config";
import estudianteRoute from "@routes/estudiante.route";
import docenteRoute from "@routes/docente.route";
import administradorRoute from "@routes/administrador.route";
import secretariaRoute from "@routes/secretaria.route";
import coordinacionRoute from "@routes/coordinacion.route";
import tipoRoute from "@routes/tipo.route";
import categoriaRoute from "@routes/categoria.route";
import prioridadRoute from "@routes/prioridad.route";
import solicitudRoute from "@routes/solicitud.route";
import multimediaRoute from '@routes/multimedia.route';
import mensajeRoute from "@routes/mensaje.route";
import preguntaFrecuenteRoute from "@routes/preguntaFrecuente.route";
import reporteRoute from "@routes/reporte.route";

const app : Application = express();

app.set('port', config.port);
app.set('json spaces', 2);

app.use(express.json({
    limit: "50mb"
}));
app.use(express.urlencoded({ 
    extended: true,
    parameterLimit: 5000000,
    limit: "50mb"
}));


app.use(endpoints.estudiantes, estudianteRoute);
app.use(endpoints.docentes, docenteRoute);
app.use(endpoints.secretarias, secretariaRoute);
app.use(endpoints.administradores, administradorRoute);
app.use(endpoints.coordinaciones, coordinacionRoute);
app.use(endpoints.prioridades, prioridadRoute);
app.use(endpoints.tipos, tipoRoute);
app.use(endpoints.categorias, categoriaRoute);
app.use(endpoints.solicitudes, solicitudRoute);
app.use(endpoints.multimedia, multimediaRoute);
app.use(endpoints.mensajes, mensajeRoute);
app.use(endpoints.preguntasFrecuentes, preguntaFrecuenteRoute);
app.use(endpoints.reportes, reporteRoute);


app.listen(app.get('port'), () => {
    console.log(`Server's running on port ${app.get('port')}`);
});


/*
const main = async () => {
    const estudiantes = await controller.list();
    console.log(estudiantes);
    
    const estudiante : Estudiante = new Estudiante("018100754I", "Julio Williams", "Hermoza Pfuyo", "Pre grado", "989708137");

    const responseAdd = await controller.add(estudiante);
    console.log(responseAdd);


}

main();*/