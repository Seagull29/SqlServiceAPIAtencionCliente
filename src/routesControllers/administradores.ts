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

        const { dni, nombre, apellidos, celular } = req.body;
        const val = await administradorController.add(new Administrador(
            dni,
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
        const { dni } = req.body;
        const val = await administradorController.delete(new Administrador(dni));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: dni });
    }

    update = async (req: Request, res: Response) => {
        const { dni, nombre, apellidos, celular } = req.body;
        const val = await administradorController.update(new Administrador(
            dni, nombre, apellidos, celular
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new AdministradorRouteController();