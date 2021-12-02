import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { categoriaController } from "@controllers/categoria.controller";
import { Categoria } from "@entities/Categoria";

class CategoriaRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await categoriaController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, nombre, descripcion, coordinacion, prioridad } = req.body;
        const val = await categoriaController.add(new Categoria(
            id, 
            nombre, 
            descripcion, 
            coordinacion, 
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
                data: await categoriaController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await categoriaController.delete(new Categoria(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, nombre, descripcion, coordinacion, prioridad } = req.body;
        const val = await categoriaController.update(new Categoria(
            id, nombre, descripcion, coordinacion, prioridad
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new CategoriaRouteController();