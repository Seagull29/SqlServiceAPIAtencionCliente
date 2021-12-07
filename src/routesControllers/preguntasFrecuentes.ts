import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { preguntaFrecuenteController } from "@controllers/preguntaFrecuente.controller";
import { PreguntaFrecuente } from "@entities/PreguntaFrecuente";

class PreguntaFrecuenteRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await preguntaFrecuenteController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, administrador, pregunta, respuesta } = req.body;
        const val = await preguntaFrecuenteController.add(new PreguntaFrecuente(
            id, 
            administrador,
            pregunta,
            respuesta
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
                data: await preguntaFrecuenteController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await preguntaFrecuenteController.delete(new PreguntaFrecuente(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, administrador, pregunta, respuesta } = req.body;
        const val = await preguntaFrecuenteController.update(new PreguntaFrecuente(
            id, administrador, pregunta, respuesta
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new PreguntaFrecuenteRouteController();