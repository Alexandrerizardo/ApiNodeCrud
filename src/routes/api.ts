import { Application, Router } from "express";
import { userRouter } from "./users";


export const useRoutes = (app: Application) => {
   
    const apiRouter = Router();
    app.use('/api/v1', apiRouter);
    apiRouter.use('/users', userRouter);
}