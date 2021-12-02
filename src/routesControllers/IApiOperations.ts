import { Request, Response } from "express";
export interface IApiOperations {

    add(req : Request, res : Response) : Promise<void>;
    list(req : Request, res : Response) : Promise<void>;
    search(req : Request, res : Response) : Promise<void>;
    delete(req : Request, res : Response) : Promise<void>;
    update(req : Request, res : Response) : Promise<void>;

}