import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { administradorController } from "@controllers/administrador.controller";
import { Administrador } from "@entities/Administrador";

class AdministradorRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await administradorController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) : Promise<void> => {

        const { identificacion, nombre, apellidos, celular } = req.body;
        const val = await administradorController.add(new Administrador(
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
                data: await administradorController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { identificacion } = req.body;
        const val = await administradorController.delete(new Administrador(identificacion));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: identificacion });
    }

    update = async (req: Request, res: Response) => {
        const { identificacion, nombre, apellidos, celular } = req.body;
        const val = await administradorController.update(new Administrador(
            identificacion, nombre, apellidos, celular
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new AdministradorRouteController();