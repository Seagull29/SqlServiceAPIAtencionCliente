import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { reporteController } from "@controllers/reporte.controller";
import { Reporte } from "@entities/Reporte";

class ReporteRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await reporteController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {

        const { id, administrador, detalle, fecha } = req.body;
        const val = await reporteController.add(new Reporte(
            id, 
            administrador,
            detalle,
            fecha
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
                data: await reporteController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await reporteController.delete(new Reporte(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, administrador, detalle, fecha } = req.body;
        const val = await reporteController.update(new Reporte(
            id, administrador, detalle, fecha
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }

    report = async (req: Request, res: Response) => {
        try {
            const { startDate, endDate, filter } = req.query;
            res.json({
                data: await reporteController.report(startDate, endDate, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }


}

export const routeController = new ReporteRouteController();