import { Request, Response } from "express";
import { IApiOperations } from "@routesControllers/IApiOperations";
import { multimediaController } from "@controllers/multimedia.controller";
import { Multimedia } from "@entities/Multimedia";
import fs from "fs";

class MultimediaRouteController implements IApiOperations {


    list = async (req: Request, res: Response) => {
        try {
            res.json({
                data: await multimediaController.list()
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }

    }

    add = async (req: Request, res: Response) => {
        const filePath = req.files[0].path;
        const file = fs.readFileSync(filePath);
        const { id, nombre, extension, mensaje, solicitud } = req.body;
        const val = await multimediaController.add(new Multimedia(
            id, 
            nombre, 
            extension, 
            file,
            mensaje, 
            solicitud
        ));
        fs.unlink(filePath, error => {
            if (error) {
                console.log(error);
            }
        });
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ added: { ...req.body,  archivo: file} });

    }

    search = async (req: Request, res: Response) => {
        try {
            const { query, filter } = req.query;
            res.json({
                data: await multimediaController.search(query, filter)
            });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        const val = await multimediaController.delete(new Multimedia(id));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ deleted: id });
    }

    update = async (req: Request, res: Response) => {
        const { id, nombre, extension, archivo, mensaje, solicitud } = req.body;
        const val = await multimediaController.update(new Multimedia(
            id, nombre, extension, archivo, mensaje, solicitud
        ));
        if (val.status) {
            res.status(403).json({ error: val.errorMessage });
            return;
        }
        res.json({ updated: { ...req.body } });
    }


}

export const routeController = new MultimediaRouteController();