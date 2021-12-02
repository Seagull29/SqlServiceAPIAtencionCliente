import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { estudianteController } from "@controllers/estudiante.controller";
import { Estudiante } from "@entities/Estudiante";

class EstudianteRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await estudianteController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { codigoUAC, nombre, apellidos, grado, celular } = req.body;
        const val = await estudianteController.add(new Estudiante(
            codigoUAC,
            nombre,
            apellidos,
            grado,
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
                data: await estudianteController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { codigoUAC } = req.body;
        const val = await estudianteController.delete(new Estudiante(codigoUAC));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: codigoUAC });
    }

    update = async (req: Request, res: Response) => {
        const { codigoUAC, nombre, apellidos, grado, celular } = req.body;
        const val = await estudianteController.update(new Estudiante(
            codigoUAC, nombre, apellidos, grado, celular
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new EstudianteRouteController();