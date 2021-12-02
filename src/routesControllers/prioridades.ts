import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { prioridadController } from "@controllers/prioridad.controller";
import { Prioridad } from "@entities/Prioridad";

class PrioridadRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await prioridadController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, nombre, nivel } = req.body;
        const val = await prioridadController.add(new Prioridad(
            id, 
            nombre, 
            nivel
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
                data: await prioridadController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await prioridadController.delete(new Prioridad(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, nombre, nivel } = req.body;
        const val = await prioridadController.update(new Prioridad(
            id, nombre, nivel
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new PrioridadRouteController();