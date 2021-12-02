import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { mensajeController } from "@controllers/mensaje.controller";
import { Mensaje } from "@entities/Mensaje";

class MensajeRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await mensajeController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, cuerpo, fecha, solicitud, estudiante, docente, administrador, secretaria } = req.body;
        const val = await mensajeController.add(new Mensaje(
            id, 
            cuerpo,
            fecha,
            solicitud,
            estudiante,
            docente,
            administrador,
            secretaria
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ added: { ...req.body } });

    }

    search = async (req: Request, res: Response) => {
        try {
            const { query, filter } = req.query;
            res.json({
                data: await mensajeController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await mensajeController.delete(new Mensaje(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, cuerpo, fecha, solicitud, estudiante, docente, administrador, secretaria } = req.body;
        const val = await mensajeController.update(new Mensaje(
            id, cuerpo, fecha, solicitud, estudiante, docente, administrador, secretaria
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new MensajeRouteController();