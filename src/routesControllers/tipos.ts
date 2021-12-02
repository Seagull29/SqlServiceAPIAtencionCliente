import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { tipoController } from "@controllers/tipo.controller";
import { Tipo } from "@entities/Tipo";

class TipoRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await tipoController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, nombre, prioridad } = req.body;
        const val = await tipoController.add(new Tipo(
            id, 
            nombre, 
            prioridad
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
                data: await tipoController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await tipoController.delete(new Tipo(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, nombre, prioridad } = req.body;
        const val = await tipoController.update(new Tipo(
            id, nombre, prioridad
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new TipoRouteController();