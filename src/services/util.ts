import { Response } from "express";

export const badRequest = (res: Response, err: string) => 
    res.status(400).json({
        err
    })

export const notFound = (res: Response) => res.sendStatus(404);

export const ok = (res: Response) => res.sendStatus(200);

export const internalServerError = (err: Error, message: string) => {
    console.log(err + message);
}

export const validateNumber = (num: any) => parseFloat(num)> 0;


