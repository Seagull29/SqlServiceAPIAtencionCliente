import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { secretariaController } from "@controllers/secretaria.controller";
import { Secretaria } from "@entities/Secretaria";

class SecretariaRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await secretariaController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { identificacion, nombre, apellidos, celular } = req.body;
        const val = await secretariaController.add(new Secretaria(
            identificacion,
            nombre,
            apellidos,
            celular
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
                data: await secretariaController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { identificacion } = req.body;
        const val = await secretariaController.delete(new Secretaria(identificacion));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: identificacion });
    }

    update = async (req: Request, res: Response) => {
        const { identificacion, nombre, apellidos, celular } = req.body;
        const val = await secretariaController.update(new Secretaria(
            identificacion, nombre, apellidos, celular
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new SecretariaRouteController();