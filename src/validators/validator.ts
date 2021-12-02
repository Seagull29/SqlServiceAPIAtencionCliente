import { validationResult  } from "express-validator";
import { Request, Response, NextFunction} from "express";
import multer from "multer";
import path from "path";

export const validateResult = (req : Request, res: Response, next : NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(403);
        res.send({
            error: err.array()
        });
    }
};

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../src/public/uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    dest: path.join(__dirname, '../../src/public/uploads'),
    limits: {
        fileSize: 5 * 1000 * 1000
    }
});

