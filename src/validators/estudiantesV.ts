import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "@validators/validator";

export const validateCreate = [
    check('codigoUAC').exists().isLength({ max: 10}).not().isEmpty(),
    check('nombre').exists().not().isEmpty(),
    check('apellidos').exists().not().isEmpty(),
    check('grado').exists(),
    check('celular').if(check('celular').exists()).isNumeric({no_symbols: true}),
    (req : Request, res : Response, next : NextFunction) => {
        validateResult(req, res, next);
    }
]


