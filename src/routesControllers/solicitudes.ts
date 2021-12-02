import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { solicitudController } from "@controllers/solicitud.controller";
import { Solicitud } from "@entities/Solicitud";

class SolicitudRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await solicitudController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, encabezado, descripcion, estado, fecha, categoria, tipo, estudiante } = req.body;
        const val = await solicitudController.add(new Solicitud(
            id, 
            encabezado,
            descripcion,
            estado,
            fecha, 
            categoria,
            tipo,
            estudiante
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
                data: await solicitudController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await solicitudController.delete(new Solicitud(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, encabezado, descripcion, estado, fecha, categoria, tipo, estudiante } = req.body;
        const val = await solicitudController.update(new Solicitud(
            id, encabezado, descripcion, estado, fecha, categoria, tipo, estudiante
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new SolicitudRouteController();