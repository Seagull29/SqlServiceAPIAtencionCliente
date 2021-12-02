import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { coordinacionController } from "@controllers/coordinacion.controller";
import { Coordinacion } from "@entities/Coordinacion";

class CoordinacionRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await coordinacionController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, nombre, docente } = req.body;
        const val = await coordinacionController.add(new Coordinacion(
            id, 
            nombre, 
            docente
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
                data: await coordinacionController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await coordinacionController.delete(new Coordinacion(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, nombre, docente } = req.body;
        const val = await coordinacionController.update(new Coordinacion(
            id, nombre, docente
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new CoordinacionRouteController();