import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { docenteController } from "@controllers/docente.controller";
import { Docente } from "@entities/Docente";

class DocenteRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await docenteController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { codigoUAC, nombre, apellidos, celular } = req.body;
        const val = await docenteController.add(new Docente(
            codigoUAC,
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
                data: await docenteController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { codigoUAC } = req.body;
        const val = await docenteController.delete(new Docente(codigoUAC));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: codigoUAC });
    }

    update = async (req: Request, res: Response) => {
        const { codigoUAC, nombre, apellidos, celular } = req.body;
        const val = await docenteController.update(new Docente(
            codigoUAC, nombre, apellidos, celular
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new DocenteRouteController();