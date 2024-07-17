import { Router } from "express";
import { userController } from "../controllers/users.controller";

const userRouter = Router();
 userRouter.post('/', userController.insertUser);
 userRouter.put('/:id', userController.updateUser);
 userRouter.get('/', userController.listUsers);
 userRouter.get('/:id', userController.getUsersById);
 userRouter.delete('/:id', userController.deleteUser);


export {userRouter}